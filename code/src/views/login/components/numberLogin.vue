<template>
  <div class="numberLogin">
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
        :rules="[{ required: true, message: '账号是必填项！' }]"
      >
        <a-input v-model:value="formState.username" placeholder="请输入账号">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        name="password"
        class="form_item_password"
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

      <a-form-item class="form_item_route">
        <a-form-item name="remember" no-style>
          <!-- <a-checkbox v-model:checked="formState.remember">自动登录</a-checkbox> -->
        </a-form-item>
        <a class="login-form-forgot" href="#/register"
          >还没账号？点击前往注册</a
        >
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
import { message } from "ant-design-vue";
import { useStore } from "@/store/index";
import { userAccountLogin } from "@/api/serve";
import { useRouter } from "vue-router";
const usestore = useStore();
const router = useRouter();
const formState = reactive({
  username: "",
  password: "",
  remember: true,
});
const onFinish =async (values) => {
  // console.log("Success:", values);
  const params = reactive({
    userAccount: values.username,
    userPassword: values.password,
  });
  // console.log(params);
  await userAccountLogin("/user/login", params)
    .then((res) => {
      if (res.code == 0 && res.message == "ok") {
        sessionStorage.setItem("isLoading", true);
        // console.log(res);
        sessionStorage.setItem("userInfo", {...res.data});
        sessionStorage.setItem("userInfoRole",res.data.userRole)
        usestore.userLoginFlag(res.data);

        // let funFlag = usestore.userLoginFlag(true, res.data);
        // if (funFlag == "ok") {
        //   message.success("登录成功！");
        //   router.push({ path: "/home" });
        // }
        let flag = sessionStorage.getItem("isLoading");
        if (flag == "true") {
          message.success("登录成功！");
          router.push({ path: "/home" });
        }
      } else {
        message.error("登录失败，请重新输入账号和密码");
      }
    })
    .catch((err) => {
      // console.log(2);
      // message.error("登录失败，请重新输入账号和密码");
    });
};
const onFinishFailed = (errorInfo) => {
  // console.log("Failed:", errorInfo);
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
    width: 328px;
    margin-right: 8px;
    vertical-align: middle;
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