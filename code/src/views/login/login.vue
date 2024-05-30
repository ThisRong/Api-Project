<template>
  <div class="login">
    <div class="login_head">
      <div class="login_head_box1">
        <img
          class="login_head_box1_img"
          src="../../../public/pictures/login_head.gif"
          alt=""
        />
        <p class="login_head_box1_p">stellaris智慧接口调用平台</p>
      </div>
      <div class="login_head_box2">
        stellaris智慧接口调用平台致力于提供稳定、安全、高效的接口调用服务
      </div>
    </div>
    <div class="login_body">
      <loginSubmit/>
    </div>
  </div>
</template>

<script setup>
import loginSubmit from './components/loginSubmit.vue';
</script>

<style lang="less" scoped>
.login {
  padding: 56px 32px;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/loginBg.png') no-repeat;
  background-size: 100% 100%;

  .login_head {
    width: 100%;
    height: 13%;
    // background-color: antiquewhite;

    .login_head_box1 {
      display: flex;
      justify-content: center;
      .login_head_box1_img {
        display: block;
        width: 44px;
        height: 44px;
        margin-right: 16px;
      }

      .login_head_box1_p {
        line-height: 44px;
        font-weight: 600;
        font-size: 33px;
        margin-bottom: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
      }
    }
    .login_head_box2 {
      text-align: center;
      font-size: 14px;
      margin-top: 10px;
      margin-bottom: 40px;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
    }
  }

  .login_body{
    width: 100%;
    height: 80%;
  }
}
</style> 