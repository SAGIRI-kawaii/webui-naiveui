import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'
import { createPageLoadingGuard } from './gurad/pageLoadingGuard'
// import { createVerifyTokenGuard } from './gurad/verifyTokenGuard'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const defaultTitle = 'Red_lnn'

router.beforeEach((to, from, next) => {
  document.title = typeof to.meta?.title === 'string' ? to.meta.title : defaultTitle
  // const $body = document.getElementsByTagName('body')
  // const $iframe = document.createElement('iframe')
  // $iframe.style.display = 'none'
  // $body[0].appendChild($iframe)
  // setTimeout(() => {
  //   document.title = typeof to.meta?.title === 'string' ? to.meta.title : defaultTitle
  //   $body[0].removeChild($iframe)
  // }, 200)
  for (const controller of window.$axiosRequestsList) {
    controller.abort()
  }
  window.$axiosRequestsList = []
  next()
})

createPageLoadingGuard(router)
// createVerifyTokenGuard(router)

export default router
