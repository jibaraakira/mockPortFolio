const Home = {
    template: '<div>Homeです。</div>'
}
const Foo = {
    template: '<div><p>Foo画面です</p>' +
        '<button class="btn btn-info" v-on:click="$store.commit(\'increment\')">クリックするとカウンターが増えます {{ count }}回目</button></div>',
    computed: {
        count: function() {
            return this.$store.state.count
        }
    }
}
