import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'

import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAtsuM7E_XzRBzU57_s_bBD0JJAXLe-0xM',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})

const settings = {
  apiKey: 'abfa7772-2a25-4d7f-9c98-ca4edbed8b52',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: true,
  version: '2.1'
}
import YmapPlugin from 'vue-yandex-maps'

Vue.use(YmapPlugin, settings)

// const YmapPlugin =  require('vue-yandex-maps');
// Vue.use(YmapPlugin)

// // or for a single instance
// const { yandexMap, ymapMarker } = require('vue-yandex-maps');
// new Vue({
//   components: { yandexMap, ymapMarker }
// })
 
import router from './router'
import store from './store'
import i18n from './i18n'
import Vuelidate from 'vuelidate'
import Toast from "./components/alert.vue";
import massage_box from "./components/massage_box.vue";
import loader from './components/loader.vue'
import inputIcon from './components/inputIcon.vue'
import inputPhone from './components/inputPhone.vue'
import inputTime from './components/inputTime.vue'
import inputSearchName from './components/inputSearchName.vue'
import modal from './components/modal.vue'
import textArea from './components/textArea.vue'
import loaderTable from './components/loaderTable.vue'
import backRouter from './components/back.vue'
import VueApexCharts from 'vue-apexcharts'


Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.component('Toast', Toast)
Vue.component('massage_box', massage_box)
Vue.component('loader', loader)
Vue.component('input-icon', inputIcon)
Vue.component('input-phone', inputPhone)
Vue.component('input-time', inputTime)
Vue.component('input-search-name', inputSearchName)
Vue.component('text-area', textArea)
Vue.component('modal-train', modal)
Vue.component('loaderTable', loaderTable)
Vue.component('backRouter', backRouter)

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')