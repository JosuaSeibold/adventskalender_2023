import { createRouter, createWebHashHistory } from 'vue-router'
import Start from '../components/start.vue';
import Flur from '../components/flur.vue';
import Wohnzimmer from '../components/wohnzimmer.vue';
import Dachboden from '../components/dachboden.vue';
import Kitchen from '../components/kitchen.vue';
import Keller from '../components/keller.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Start
  },
  {
    path: '/flur',
    name: 'flur',
    component: Flur
  },
  {
    path: '/wohnzimmer',
    name: 'wohnzimmer',
    component: Wohnzimmer
  },
  {
    path: '/kitchen',
    name: 'kitchen',
    component: Kitchen
  },
  {
    path: '/dachboden',
    name: 'dachboden',
    component: Dachboden
  },
  {
    path: '/keller',
    name: 'keller',
    component: Keller
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
