<template>
  <div class="emailLogin">
    <a-form
      :model="formState"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        name="username"
        class="form_item"
        :rules="[{ required: true, message: '邮箱账号是必填项！' }]"
      >
        <a-input
          v-model:value="formState.username"
          placeholder="请输入邮箱账号！"
        >
          <template #prefix>
            <FolderOpenOutlined />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        name="password"
        class="form_item_password"
        :rules="[{ required: true, message: '验证码是必填项！' }]"
      >
        <a-input
          v-model:value="formState.password"
          placeholder="请输入验证码！"
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input>
        <a-button>获取验证码</a-button>
      </a-form-item>

      <a-form-item class="form_item_route">
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="formState.remember">自动登录</a-checkbox>
        </a-form-item>
        <a class="login-form-forgot" href="#/register">还没账号？点击前往注册</a>
      </a-form-item>

      <a-form-item class="form_item_submit">
        <a-button type="primary" html-type="submit" class="login-form-button">
          登录
        </a-button>
      </a-form-item>
    </a-form>

    <!-- 其他登录方式 -->
    <div class="otherLogin">
      <p>其他登录方式：</p>
      <div class="otherLogin_icon">
        <AlipayCircleOutlined style="fontSize:24px;color:rgba(0,0,0,0.2);"/>
        <TaobaoCircleOutlined style="fontSize:24px;color:rgba(0,0,0,0.2);"/>
        <WeiboCircleOutlined style="fontSize:24px;color:rgba(0,0,0,0.2);"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { reactive, computed } from "vue";
const router = useRouter();
const formState = reactive({
  username: "",
  password: "",
  remember: true,
});
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
</script>

<style lang="less" scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
/deep/#normal_login_username {
  font-size: 16px;
  height: 30px;
}
/deep/#normal_login_password {
  height: 30px;
}
/deep/.form_item_password {
  width: 100%;

  .ant-input-affix-wrapper {
    font-size: 16px;
    width: 208px;
    margin-right: 8px;
    vertical-align: middle;
  }

  .ant-btn-default {
    width: 112px;
    height: 40px;
    vertical-align: middle;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
}
/deep/.form_item_route .ant-form-item-control-input-content {
  display: flex;
  justify-content: space-between;
}
/deep/.form_item_submit .login-form-button {
  width: 100%;
  height: 40px;
}

/deep/.otherLogin {
  width: 328px;
  height: 25px;
  margin: 0 auto;
  line-height: 24px;
  display: flex;
  p{
    margin-bottom: 0;
  }

  .otherLogin_icon span{
    margin-left: 8px;
  }
  .otherLogin_icon span:hover{
    color: #0958d9 !important;
    cursor:pointer;
    transition: color 0.3s ease 0s;
  }
}
</style>