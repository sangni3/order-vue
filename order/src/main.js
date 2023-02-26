import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

import VueAxios from 'vue-axios'

import VueLazyLoad from 'vue-lazyload'
app.use(VueLazyLoad)

app.use(VueAxios, axios)
// axios.defaults.baseURL = 'http://127.0.0.1:8000'
// axios.defaults.withCredentials = true;
//
// app.config.globalProperties.$http = axios
// app.config.productionTip = false

app.use(router).mount('#app')

import { Notify } from 'vant';
import { ActionBar, ActionBarIcon, ActionBarButton } from 'vant';
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);
app.use(Notify);


import store from './store'
import Vuex from "vuex";
app.use(Vuex);
app.use(store)


export default app;
