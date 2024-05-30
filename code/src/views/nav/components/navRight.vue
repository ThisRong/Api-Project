<template>
  <div class="navRight">
    <!-- <div class="navRight_l">
      <a href="#/developerdoc">
        <img src="/pictures/wendang.svg" alt="" /><span>开发者文档</span>
      </a>
    </div> -->
    <a-dropdown placement="bottom" arrow="{ pointAtCenter: true }">
      <div class="navRight_r">
        <a-avatar
          :size="28"
          style="background-color: #7265e6; verticalalign: 'middle'"
        >
          U
        </a-avatar>
        <span>{{ username }}</span>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="#/userinfo" class="navRight_r_i">
              <UserOutlined />
              我的信息</a
            >
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" class="navRight_r_i" @click="tuichuLogin">
              <LogoutOutlined />
              退出登录</a
            >
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
  <a-modal v-model:open="open" title="是否退出登录" @ok="handleOk"> </a-modal>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store/index";
// import bus from '@/utils/eventBus'
const router = useRouter();
const usestore = useStore();
let username = ref("游客");
username = usestore.getUserInfo.userAccount;
const tuichuLogin = () => {
  open.value = true;
};
const open = ref(false);
const handleOk = (e) => {
  open.value = false;
  sessionStorage.setItem("isLoading", false);
  let flag = sessionStorage.getItem("isLoading");
  if (flag == "false") {
    router.push("/login");
    usestore.userLoginFlag({});
  }
};
// bus.on('sent',(value)=>{
//   location.reload()
// })
</script>

<style lang="less" scoped>
.navRight {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: right;

  .navRight_l {
    width: 150px;
    height: 100%;
    line-height: 60px;

    a {
      text-decoration: none; /* 去除默认的下划线 */
      outline: none; /* 去除旧版浏览器的点击后的外虚线框 */
      color: #000; /* 去除默认的颜色和点击后变化的颜色 */
      img {
        width: 28px;
        margin-right: 5px;
      }
      span {
        color: #9a9a9a;
        font-weight: 700;
        vertical-align: middle;
      }
    }
  }

  .navRight_r {
    min-width: 70px;
    height: 100%;
    margin-right: 35px;
    line-height: 60px;
    text-align: center;
    cursor: pointer;

    span {
      margin-left: 5px;
      vertical-align: middle;
    }

    .navRight_r_i {
      display: block;

      img {
        width: 24px;
      }
    }
  }
}
</style>