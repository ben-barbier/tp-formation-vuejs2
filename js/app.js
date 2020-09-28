console.log(Vue.version);

const vm = new Vue({
    el: '#app',
    data: {
        title: 'Hello ciné'
    },
    beforeCreate: function () {
        // Les data ne sont pas encore renseignées 🛑
        console.log('beforeCreate', this.title, this.$el); // => undefined
    },
    created: function () {
        // Les data sont renseignées ✅
        console.log('created', this.title, this.$el); // => 'Hello ciné'
    },
    beforeMount: function () {
        // this.$el = element avec les moustaches {{...}} dans le template
        console.log('beforeMount', this.title, this.$el);
    },
    mounted: function () {
        // this.$el = element avec les valeurs interprétées dans le template
        console.log('mounted', this.title, this.$el);
    },
    beforeDestroy: function () {
        console.log('beforeDestroy', this.title, this.$el);
    },
    destroyed: function () {
        console.log('destroyed', this.title, this.$el);
    },
});
