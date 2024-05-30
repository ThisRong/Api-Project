<template>
  <div class="registerSubmit">
    <div class="registerSubmit_head">
      <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
    </div>
    <div class="registerSubmit_form">
      <div class="registerSubmit_youxiang" v-show="current[0] === 'mail'">
        <emailRegisterVue/>
      </div>
      <div class="registerSubmit_zhanghu" v-show="current[0] === 'app'">
        <numberRegisterVue/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h, ref } from "vue";
import emailRegisterVue from "./emailRegister.vue";
import numberRegisterVue from './numberRegister.vue';
const current = ref(["mail"]);
const items = ref([
  {
    key: "mail",
    label: "邮箱账号注册",
    title: "邮箱账号注册",
  },
  {
    key: "app",
    label: "平台账户注册",
    title: "平台账户注册",
  },
]);
</script>

<style lang="less" scoped>
.registerSubmit {
  width: 328px;
  height: 276px;
  // background-color: aqua;
  margin: 0 auto;

  .registerSubmit_head {
    margin-bottom: 16px;

    .ant-menu {
      width: 100%;
      height: 46px;
      background-color: rgba(0, 0, 0, 0);
      justify-content: center;
    }
  }

  .registerSubmit_form {
    width: 100%;
    height: 214px;
    // background-color: antiquewhite;
  }
}
</style>