import Vue from 'vue'
import Router from 'vue-router'

import CustomersPage from '@src/components/pages/CustomersPage'
import CustomerDetailsPage from '@src/components/pages/CustomerDetailsPage'

Vue.use(Router)

export const routes = [
  { path: '/', redirect: { name: 'Customers' } },
  { path: '/customers', name: 'Customers', component: CustomersPage },
  { path: '/customers/new', name: 'NewCustomer', component: CustomerDetailsPage },
  { path: '/customers/:customerId', name: 'CustomerDetails', component: CustomerDetailsPage },
  { path: '**', redirect: { name: 'Customers' } }
]

export default new Router({
  mode: 'history',
  routes: routes
})
