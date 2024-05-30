import { createRouter, createWebHashHistory } from 'vue-router'
import { useStore } from '@/store';
const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path:'/home',
    name:'home',
    component:()=>import(/* webpackChunkName:"home" */ '../views/home/home.vue')
  },
  {
    path:'/interfacesquare',
    name:'interfacesquare',
    component:()=>import(/* webpackChunkName:"interfacesquare" */ '../views/interfacesquare/interfacesquare.vue')
  },
  {
    path:'/sensitiveword',
    name:'sensitiveword',
    component:()=>import(/* webpackChunkName:"sensitiveword" */ '../views/sensitiveword/sensitiveword.vue')
  },
  {
    path:'/usermanagement',
    name:'usermanagement',
    component:()=>import(/* webpackChunkName:"usermanagement" */ '../views/usermanagement/usermanagement.vue')
  },
  {
    path:'/currentlimiting',
    name:'currentlimiting',
    component:()=>import(/* webpackChunkName:"currentlimiting" */ '../views/currentlimiting/currentlimiting.vue')
  },
  {
    path:'/userinfo',
    name:'userinfo',
    component:()=>import(/* webpackChunkName:"userinfo" */ '../views/userinfo/userinfo.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import(/* webpackChunkName:"login" */ '../views/login/login.vue')
  },
  {
    path:'/register',
    name:"register",
    component:()=>import(/* webpackChunkName:"register" */ '../views/register/register.vue')
  },
  {
    path:'/developerdoc',
    name:"developerdoc",
    component:()=>import(/* webpackChunkName:"developerdoc" */ '../views/developerdoc/developerdoc.vue')
  },
  {
    path:'/interfacepage',
    name:"interfacepage",
    component:()=>import(/* webpackChunkName:"developerdoc" */ '../views/interfacesquare/components/interfacepage')
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
const whiteList = ['/register'];
router.beforeEach((to,from,next)=>{
  const isAuthenticated = checkUserAuthentication();
  if(isAuthenticated == "true"){
    if(to.path == '/login'){
      next('/home');
    }else{
      next();
    }
  }else{
    if(whiteList.includes(to.path)){
      next();
    }else{
      if(to.path == '/login'){
        next();
      }else{
        next('/login');
      }
    }
  }
});
router.afterEach(()=>{
  
});
// 检查用户是否已经登录
function checkUserAuthentication(){
  let flag = sessionStorage.getItem('isLoading');
  // console.log(array,'111');
  // const usestore = useStore();
  // let userIsAuthenticated = usestore.getIsLoading;
  let userIsAuthenticated = flag;
  return userIsAuthenticated;
}

export default router
