const listOperator = {
    keys: ['id', 'title', 'updateTime', 'creator'],
    add(list, item) {
        list.push(item)
    },
    delete(list, item) {
        const index = list.indexOf(item);
        list.splice(index, 1);
    },
    update(list, item, index) {
        list[index] = item;
    },
    search(list, word, property = undefined) {
        if (property === undefined) {
            return list.filter(
                item => word === '' ? true : includes(word)
            )
        } else {
            if (property.keyword !== undefined) {

                return list.filter(
                    item => word === '' ? true : item[property.keyword].includes(word)
                )
            }

            if (property.allMatch === true) {
                return list.filter(
                    item => {
                        const searchWord = this.keys.map(k => item[k].toString()).join('');
                        return word === '' ? true : searchWord.includes(word)
                    }
                )
            }

        }

    }

}


function getCurrentDate() {
    const nowDate = new Date();
    const getValue = (value) => ('0' + value).slice(-2)

    const date = {
        year: nowDate.getFullYear(),
        month: getValue(nowDate.getMonth() + 1),
        date: getValue(nowDate.getDate()),
        hour: getValue(nowDate.getHours()),
        minutes: getValue(nowDate.getMinutes()),
        seconds: getValue(nowDate.getSeconds())
    };
    return `${date.year}${date.month}${date.date}_${date.hour}${date.minutes}${date.seconds}`;
}

const store = new Vuex.Store({
    state: {
        addProjectMode: false,
        projectList: data.main,
        phaseIndex: 0,
        documentIndex: 0,
        projectId: 0,
        searchMode: ''
    },
    mutations: {
        changeProjectId(state, id) {
            state.projectId = id;
            state.searchMode = 'project'
        },
        editProject(state, arr) {
            const list = state.projectList;
            switch (arr[0]) {
                case "update":
                    listOperator.update(list, arr[1], arr[2])
                    break;
                case "add":
                    listOperator.add(list, arr[1])
                    break;
                case "delete":
                    listOperator.delete(list, arr[1])
                    break;
            }
        },
        switch (state) {
            state.addProjectMode = !state.addProjectMode;
        },
        setPhaseIndex(state, number) {
            state.phaseIndex = number;
            state.searchMode = 'phase'
        },
        setDocumentIndex(state, number) {
            state.documentIndex = number;
            state.searchMode = 'document'
        }

    }
});


class VueComponentGetter {

    static getRecordTable(projectRecords, store) {
        return {
            store,
            template: `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>変更時間</th>
                                    <th>メッセージ</th>
                                    <th>ユーザー</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="record in getRecords()">
                                    <td>{{record.time}}</td>
                                    <td>{{record.message}}</td>
                                    <td>{{record.user}}</td>
                                </tr>
                            </tbody>
                        </table>`,
            methods: {
                getRecords() {
                    const id = this.$store.state.projectId;
                    const phaseIndex = this.$store.state.phaseIndex
                    const documentIndex = this.$store.state.documentIndex
                    const searchMode = this.$store.state.searchMode;

                    switch (searchMode) {
                        case '':
                            return;
                        case 'project':
                            return projectRecords.filter(record => record.id === id)[0]
                                .records;
                        case 'phase':
                            return projectRecords.filter(record => record.id === id)[0]
                                .phases[phaseIndex].records;
                        case 'document':
                            return projectRecords.filter(record => record.id === id)[0]
                                .phases[phaseIndex].documents[documentIndex].records;
                        default:
                            break;
                    }

                }
            }
        }

    }

    static getDocumentList(documents, store) {
        return {
            props: ['documentIndex'],
            store,
            data: {
                seen: true
            },
            template: `<div class="card-body">
                            <ul class="list-group list-group-flush ml-3" v-for="doc in getDocuments">
                                <li class="list-group-item list-group-item-action" v-on:click.stop="clickDocument(doc.id)">{{ doc.title }}</li>
                            </ul>
                        </div>`,
            methods: {
                clickDocument(index) {
                    this.$store.commit('setDocumentIndex', index)
                }
            },
            computed: {
                getDocuments() {
                    return documents[this.documentIndex].map((v, i) => {
                        return {
                            id: i,
                            title: v
                        };
                    })
                }
            }
        }
    }

    static getProjectPhaseList(list, store) {
        const lis = list.map(
            (v, i) => `<li class="list-group-item list-group-item-action" v-on:click.stop="clickPhase(${i})">
                            <div>${i+1}:${v}</div>
                            <document-list v-bind:document-index="${i}"></document-list>
                        </li>
                        `).join('\n')
        return {
            props: ['projectIndex'],
            data: {
                seen: false
            },
            store,
            template: `<div class="projectLoger__phaseList card m-2">
                            <div class="card-body">
                                <div class="projectLoger__state my-1">
                                    <ul class="list-group list-group-flush">
                                        ${lis}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        `,
            methods: {
                clickPhase(phaseIndex) {
                    this.data = !this.data;
                    this.$store.commit('setPhaseIndex', phaseIndex)
                },
            },
            components: {
                'document-list': this.getDocumentList(divisions.documents, store),
            }
        }
    }
}

new Vue({
    el: '#app',
    store,
    data: {
        projectName: '',
        noSearchFlag: false,
        children: [],
        check: {
            a: false,
            b: true
        }
    },
    methods: {
        showAddProjectForm() {
            this.$store.commit('switch');
        },
        addNewProject() {
            const projectName = this.projectName;
            if (projectName === '') {
                return;
            }
            const item = {
                id: this.$store.state.projectList.length,
                title: projectName,
                updateTime: getCurrentDate(),
                creator: "寺原",
                seen: false
            }
            this.$store.commit('editProject', ['add', item]);
        },
        viewPhase(id) {
            const flag = this.$store.state.projectList[id]['seen'];
            this.$store.state.projectList[id]['seen'] = !flag;
            this.$store.commit('changeProjectId', id);
        }
    },
    computed: {
        getProjectList() {
            const resultList = listOperator.search(
                this.$store.state.projectList,
                this.projectName, {
                    allMatch: true
                }
            );
            this.$data.noSearchFlag = resultList.length === 0;
            return resultList;
        },
        getProjectAddMode() {
            return this.$store.state.addProjectMode;
        },
        noSearchFlag() {
            return this.$data.noSearchFlag
        },

    },
    components: {
        'project-phase': VueComponentGetter.getProjectPhaseList(divisions.phase, store),
        'record-table': VueComponentGetter.getRecordTable(projectRecodes, store)
    }
})