import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Dialog } from 'vant'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/',
    // name: 'layout', // 拥有默认子路由时，此 name 没有意义
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 默认子路由，只能有一个
        name: 'home',
        component: () => import('@/views/home'),
        meta: {
          requireAuth: false
        }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: {
          requireAuth: false
        }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true, // 开启 props 传参，把路由参数映射到组件的 props 数据中
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
    meta: {
      requireAuth: false
    }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach(async (to, from, next) => {
  // to 去哪
  // from 从哪里来的
  // next 放行
  if (!to.meta.requireAuth) return next()
  const { user } = store.state
  if (user && user.token) return next()
  const r = await Dialog.confirm({
    title: '提示',
    message: '是否需要登录'
  })
    .then(r => r)
    .catch(e => e)
  if (r === 'confirm') {
    redirectLogin()
  }
})
function redirectLogin() {
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
export default router
