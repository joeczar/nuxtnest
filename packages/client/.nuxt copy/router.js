import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9c00c81a = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _49f62a20 = () => interopDefault(import('../pages/logout.vue' /* webpackChunkName: "pages/logout" */))
const _0122b958 = () => interopDefault(import('../pages/order.vue' /* webpackChunkName: "pages/order" */))
const _2bb541b3 = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _c253d7ee = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _8bb4d6a2 = () => interopDefault(import('../pages/thanks.vue' /* webpackChunkName: "pages/thanks" */))
const _dbb2e986 = () => interopDefault(import('../pages/thanks-for-registering.vue' /* webpackChunkName: "pages/thanks-for-registering" */))
const _2f500e48 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _9c00c81a,
    name: "login"
  }, {
    path: "/logout",
    component: _49f62a20,
    name: "logout"
  }, {
    path: "/order",
    component: _0122b958,
    name: "order"
  }, {
    path: "/profile",
    component: _2bb541b3,
    name: "profile"
  }, {
    path: "/register",
    component: _c253d7ee,
    name: "register"
  }, {
    path: "/thanks",
    component: _8bb4d6a2,
    name: "thanks"
  }, {
    path: "/thanks-for-registering",
    component: _dbb2e986,
    name: "thanks-for-registering"
  }, {
    path: "/",
    component: _2f500e48,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
