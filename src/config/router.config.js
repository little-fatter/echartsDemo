import { BlankLayout } from '@/components/layouts'
/**
 *  配置路由信息
 *  其中meta包含：
 *  title：路由的描述信息,建议设置
 *  keepAlive:设置访问路由是否保持组件，功能参见Vue的keepAlive描述
 *  hiddenHeaderContent:设置是否需要隐藏页面头信息
 */

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BlankLayout,
    meta: { title: '首页' },
    redirect: '/home/dashboard',
    children: [
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   redirect: '/dashboard/workplace',
      //   component: RouteView,
      //   meta: { title: '仪表盘' },
      //   children: [
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'Workplace',
      //       component: () => import('@/views/dashboard/Workplace'),
      //       meta: { title: '工作台' }
      //     }
      //   ]
      // },
      {
        path: '/home',
        name: 'home',
        redirect: '/home/dashboard',
        component: () => import('@/views/home/home'),
        meta: { title: '首页' },
        children: [
          {
            path: '/home/dashboard',
            name: 'dashboard',
            component: () => import('@/views/dashboard/dashboard'),
            meta: { title: '综合首页' }
          },
          {
            path: '/home/waterQuality',
            name: 'waterQuality',
            component: () => import('@/views/waterQuality/waterQuality'),
            meta: { title: '水质反演' }
          },
          {
            path: '/home/wander',
            name: 'wander',
            component: () => import('@/views/wander/wander'),
            meta: { title: '漫游' }
          },
          {
            path: '/home/assist',
            name: 'assist',
            component: () => import('@/views/assist/assist'),
            meta: { title: '辅助决策' }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404'
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
    meta: { title: '登录页面' }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
    meta: { title: '404页面' }
  }
]
