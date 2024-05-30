<template>
  <div class="loginSubmit">
    <div class="loginSubmit_head">
      <a-menu
      v-model:selectedKeys="current"
      mode="horizontal"
      :items="items"
    />
    </div>
    
    <div class="loginSubmit_form">
      <div class="loginSubmit_youxiang" v-show="current[0] === 'mail'">
        <emailLoginVue/>
      </div>
      <div class="loginSubmit_zhanghu" v-show="current[0] === 'app'">
        <numberLoginVue/>
      </div>
    </div>
  </div>
</template>

<script setup>
import emailLoginVue from './emailLogin.vue';
import numberLoginVue from './numberLogin.vue';
import { h, ref } from "vue";
const current = ref(["mail"]);
const items = ref([
  {
    key: "mail",
    label: "邮箱账号登录",
    title: "邮箱账号登录",
  },
  {
    key: "app",
    label: "账户密码登录",
    title: "账户密码登录",
  },
]);
</script>

<style lang="less" scoped>
.loginSubmit {
  width: 328px;
  height: 276px;
  // background-color: aqua;
  margin: 0 auto;

  .loginSubmit_head{
    margin-bottom: 16px;

    .ant-menu{
      width: 100%;
      height: 46px;
      background-color: rgba(0, 0, 0, 0.0);
      justify-content: center;
    }
  }

  .loginSubmit_form{
    width: 100%;
    height: 214px;
    // background-color: antiquewhite;
  }
}
</style>
