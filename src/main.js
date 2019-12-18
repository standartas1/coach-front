import Vue from 'vue';
import { store } from './_store';
import { router } from './_helpers';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
