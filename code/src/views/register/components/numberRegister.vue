<template>
  <div class="numberRegister">
    <a-form
      :model="formState"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <!-- <a-form-item name="virtualname" class="form_item">
        <a-input v-model:value="formState.virtualname" placeholder="请输入昵称">
          <template #prefix>
            <AliwangwangOutlined />
          </template>
        </a-input>
      </a-form-item> -->

      <a-form-item
        name="username"
        class="form_item"
        :rules="[{ required: true, message: '账号是必填项！' }]"
      >
        <a-input v-model:value="formState.username" placeholder="请输入账号">
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>

      <!-- <a-form-item name="gender" label="性别" class="form_item">
        <a-radio-group v-model:value="formState.gender">
          <a-radio value="1">男</a-radio>
          <a-radio value="0">女</a-radio>
        </a-radio-group>
      </a-form-item> -->

      <a-form-item
        name="password"
        class="form_item"
        :rules="[{ required: true, message: '密码是必填项！' }]"
      >
        <a-input-password
          v-model:value="formState.password"
          placeholder="请输入密码"
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        name="password02"
        class="form_item"
        :rules="[{ required: true, message: '密码是必填项！' }]"
      >
        <a-input-password
          v-model:value="formState.password02"
          placeholder="请确认密码"
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item
        name="remember"
        class="registerCss"
        :rules="[{ required: true, message: '此项是必选项！！！' }]"
      >
        <a-checkbox-group v-model:value="formState.remember">
          <a-checkbox value="true" name="remember"
            >同意并接收《<a href="javascript:;">隐私协议</a>》《<a
              href="javascript:;"
              >用户协议</a
            >》</a-checkbox
          >
        </a-checkbox-group>
      </a-form-item>
      <a-form-item class="form_item_route registerCss">
        <a class="login-form-forgot" href="#/login">已有账号？点击前往登录</a>
      </a-form-item>

      <a-form-item class="form_item_submit">
        <a-button type="primary" html-type="submit" class="login-form-button">
          注册
        </a-button>
      </a-form-item>
    </a-form>

    <!-- 其他登录方式 -->
    <div class="otherLogin">
      <p>其他登录方式：</p>
      <div class="otherLogin_icon">
        <AlipayCircleOutlined
          style="fontsize: 24px; color: rgba(0, 0, 0, 0.2)"
        />
        <TaobaoCircleOutlined
          style="fontsize: 24px; color: rgba(0, 0, 0, 0.2)"
        />
        <WeiboCircleOutlined
          style="fontsize: 24px; color: rgba(0, 0, 0, 0.2)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { addAccountUser } from "@/api/serve";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
const router = new useRouter();
const formState = reactive({
  // virtualname: "",
  username: "",
  password: "",
  password02: "",
  remember: "",
});
const onFinish = (values) => {
  if (values.password !== values.password02) {
    message.error("两次的密码不一致！");
    return;
  }
  // console.log(values);
  const params = reactive({
    checkPassword: values.password02,
    userAccount: values.username,
    userPassword: values.password,
  });
  // console.log(params,'234');
  addAccountUser("/user/register", params)
    .then((res) => {
      if (res.code == 0 && res.message == "ok") {
        message.success("注册成功！");
        router.push({ path: "/login" });
      }
      else if(res.code == '40000'){
        message.info("用户密码过短！");
      }
    })
    .catch((err) => {
      message.error("注册失败");
    });
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password && formState.remember);
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
  justify-content: right;
}
.registerCss {
  margin-bottom: 0;
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
  p {
    margin-bottom: 0;
  }

  .otherLogin_icon span {
    margin-left: 8px;
  }
  .otherLogin_icon span:hover {
    color: #0958d9 !important;
    cursor: pointer;
    transition: color 0.3s ease 0s;
  }
}
</style>