import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import Message from 'primevue/message';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';


import AuthComponent from '@/components/auth/AuthComponent.vue'
import BrandsComponent from '@/components/cruds/BrandsComponent.vue'
import ClientsComponent from '@/components/cruds/ClientsComponent.vue'
import RolesComponent from '@/components/cruds/RolesComponent.vue'
import UsersComponent from '@/components/cruds/UsersComponent.vue'
import VehiclesComponent from '@/components/cruds/VehiclesComponent.vue'


Vue.config.productionTip = false

Vue.component('DataTable', DataTable);
Vue.component('Column', Column);
Vue.component('Panel', Panel);
Vue.component('Menubar', Menubar);
Vue.component('Dialog', Dialog);
Vue.component('Message', Message);
Vue.component('Toast',Toast);
Vue.use(ToastService);

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      path: '/',
      component: AuthComponent
    },
    {
      path: '/users',
      component: UsersComponent
    },
    {
      path: '/vehicles',
      component: VehiclesComponent
    },
    {
      path: '/brands',
      component: BrandsComponent
    },
    {
      path: '/clients',
      component: ClientsComponent
    },
    {
      path: '/roles',
      component: RolesComponent
    }
  ]
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
