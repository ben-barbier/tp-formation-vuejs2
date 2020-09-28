console.log(Vue.version);

const vm = new Vue({
    el: '#app',
    data: {
        title: 'Hello ciné'
    },
    beforeCreate() {
        // Les data ne sont pas encore renseignées 🛑
        console.log('beforeCreate', this.title, this.$el); // => undefined
    },
    created() {
        // Les data sont renseignées ✅
        console.log('created', this.title, this.$el); // => 'Hello ciné'
    },
    beforeMount() {
        // this.$el = element avec les moustaches {{...}} dans le template
        console.log('beforeMount', this.title, this.$el);
    },
    mounted() {
        // this.$el = element avec les valeurs interprétées dans le template
        console.log('mounted', this.title, this.$el);
    },
    beforeDestroy() {
        console.log('beforeDestroy', this.title, this.$el);
    },
    destroyed() {
        console.log('destroyed', this.title, this.$el);
    },
});
