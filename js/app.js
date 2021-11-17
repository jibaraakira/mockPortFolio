const divisions = {
    phase: [
        "要求分析(要件定義)",
        "基本設計(外部設計)",
        "詳細設計(内部設計)",
        "プログラミング",
        "単体テスト",
        "結合テスト",
        "総合テスト"
    ],
    documents: [
        ["要求分析書(要件定義書)"],
        ["業務フロー", "システム構成図", "ER図", "テーブル定義書", "機能一覧表", "設計書記述様式", "基本設計書(外部設計書)"],
        ["画面遷移図", "詳細設計書(内部設計書)", "プロジェクト共通ルール"],
        [],
        ["単体テスト仕様書/報告書"],
        ["結合テスト仕様書/報告書"],
        ["総合テスト仕様書/報告書"],
    ]
}

const data = {
    main: [
        { id: 0, title: "OOプロジェクト", updateTime: "2021-10-17 10:19:18", creator: "東風谷早苗", seen: false },
        { id: 1, title: "XXプロジェクト", updateTime: "2021-10-17 10:19:18", creator: "白井黒子", seen: false },
        { id: 2, title: "YYプロジェクト", updateTime: "2021-10-17 10:19:18", creator: "リムル・テンペスト", seen: false },
    ],
}

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
        projectList: data.main
    },
    mutations: {
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
        }
    }
});


class VueComponentGetter {

    static getDocumentList(documents, store) {
        return {
            props: ['documentIndex'],
            store,
            data: {
                seen: true
            },
            //template: `<div>template:</div>`,
            template: `<div class="card-body">
                            <ul class="list-group list-group-flush ml-3" v-for="doc in getDocuments">
                                <li class="list-group-item list-group-item-action" :click="clickDocument(doc.id)">{{ doc.title }}</li>
                            </ul>
                        </div>`,
            methods: {
                clickDocument(index) {
                    console.log(index)
                }
            },
            computed: {
                getDocuments() {
                    return documents[this.documentIndex].map((v, i) => { return { id: i, title: v }; })
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
            props: ['parentIndex'],
            data: { seen: false },
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
                clickPhase(index) {
                    this.data = !this.data;
                    console.log(`${this.parentIndex}-${index}`)
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
        'project-phase': VueComponentGetter.getProjectPhaseList(divisions.phase, store)
    }
})