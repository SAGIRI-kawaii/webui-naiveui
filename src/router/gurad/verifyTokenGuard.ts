import { Router } from 'vue-router'
// import { ElNotification } from 'element-plus'

export function createVerifyTokenGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    if (to.matched.some((auth) => auth.meta.requireAuth)) {
      const token = localStorage.getItem('token')
      if (token) {
        const jwt = JSON.parse(atob(token.split('.')[1]))
        if (jwt.exp * 1000 < Date.now()) {
          sessionStorage.removeItem('token')
          // ElNotification({
          //   title: '登录失效',
          //   message: '你的登录信息已过期，正在跳转至登录页……',
          //   type: 'error',
          // })
          next({
            path: '/login',
            query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        } else if (Object.keys(from.query).length === 0) {
          //判断路由来源是否有query，处理不是目的跳转的情况
          next()
        } else {
          const redirect = from.query.redirect //如果来源路由有query
          if (!redirect || to.path === redirect) {
            //这行是解决next无限循环的问题
            next()
          } else {
            next({ path: redirect.toString() }) //跳转到目的路由
          }
        }
      } else {
        // ElNotification({
        //   title: '未登录',
        //   message: '你正在访问需要登录的页面，正在跳转至登录页……',
        //   type: 'error',
        // })
        next({
          path: '/login',
          query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    } else {
      const redirect = from.query.redirect //如果来源路由有query
      if (!redirect || to.path === redirect) {
        //这行是解决next无限循环的问题
        next()
      } else {
        next({ path: redirect.toString() }) //跳转到目的路由
      }
    }
  })
}
