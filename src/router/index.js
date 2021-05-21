import Vue from 'vue'
import VueRouter from 'vue-router'

const Cart = () => import("views/shopcart/Shopcart")
const Home = () => import("views/home/Home")
const Category = () => import("views/category/Category")
const Profile = () => import("views/profile/Profile")
const Detail = () => import("views/detail/Detail")

Vue.use(VueRouter)

const routes = [{
  path: '',
  redirect: '/home'
},
  {
    path: '/home',
    component: Home, meta: {show: true}
  },
  {
    path: '/cart',
    component: Cart, meta: {show: true}
  },
  {
    path: '/category',
    component: Category,
    meta: {show: true}
  },
  {
    path: '/profile',
    component: Profile, meta: {show: true}
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {show: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
