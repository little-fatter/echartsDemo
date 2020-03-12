import router from './router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

/** 路由进入事件 */
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  next()
})

/** 路由完成事件 */
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
