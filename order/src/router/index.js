import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Home from "@/views/home/Home";
import Cart from "@/views/cart/Cart";
import Profile from "@/views/profile/Profile";
import request from "@/router/axios";
import Order from "@/views/order/Order";

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      title:'首页',
      keepAlive: true,
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta:{
      title:'购物车'
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta:{
      title:'订单',
      keepAlive: true,
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta:{
      title:'个人中心',
      keepAlive: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component:()=>import('../views/profile/Login'),
    meta:{
      title:'登录'
    }
  },
  {
    path: '/register',
    name: 'Legister',
    component:()=>import('../views/profile/Register'),
    meta:{
      title:'注册'
    }
  },

]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  document.title=to.meta.title
  // 判断是否含有token
  const token = localStorage.getItem("token");
  if (to.path === '/login' || to.path === '/') {
    next();
  }
  else {
    if (token) {
        next();

    } else {
      next('/login');
    }
  }

})
export default router
