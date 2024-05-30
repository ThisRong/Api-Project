import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      isLoading: null,
      userInfo:{},
      spinning: false,
    }
  },
  getters:{
    getIsLoading(state){
      let storage = sessionStorage.getItem('isLoading');
      return storage;
    },
    getUserInfo(state){
      return state.userInfo;
    }
  },
  actions:{
    userLoginFlag(userInfo){
      this.userInfo = userInfo;
      return 'ok';
    },
    setCurRequestNum(num) {
      this.spinning = num !== 0//控制spin组件的状态
    }
  },
  persist: true,
})