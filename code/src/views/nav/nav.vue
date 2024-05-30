<template>
  <div class="nav">
    <div class="nav_left">
      <div class="nav_left_logo" @click="navRoute">
        <i></i>
        <span>Stellaris智慧接口调用平台</span>
      </div>
      <div class="nav_left_route">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          theme="light"
        />
      </div>
    </div>
    <div class="nav_right">
      <navRightVue />
    </div>
  </div>
</template>

<script setup>
import { h, ref } from "vue";
import {
  SmileOutlined,
  GlobalOutlined,
  PayCircleOutlined,
  UserOutlined,
  AppstoreOutlined,
  FontColorsOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
import navRightVue from "./components/navRight.vue";
import { useStore } from "@/store/index";
const usestore = useStore();
let items = ref([]);
if (usestore.getUserInfo.userRole == "admin") {
  items.value = [
    {
      key: "mail",
      label: h(
        "a",
        {
          href: "#/home",
        },
        "欢迎"
      ),
      icon: () => h(SmileOutlined),
      title: "欢迎",
    },
    {
      key: "app",
      label: h(
        "a",
        {
          href: "#/interfacesquare",
        },
        "接口广场"
      ),
      icon: () => h(GlobalOutlined),
      title: "接口广场",
    },
    // {
    //   key: "alipay",
    //   label: "系统管理",
    //   icon: () => h(AppstoreOutlined),
    //   title: "系统管理",
    //   // children: [
    //     // {
    //     //   title: "敏感词管理",
    //     //   key: "steam1",
    //     //   label: h(
    //     //     "a",
    //     //     {
    //     //       href: "#/sensitiveword",
    //     //     },
    //     //     "敏感词管理"
    //     //   ),
    //     //   icon: () => h(FontColorsOutlined),
    //     // },
    //     // {
    //     //   title: "用户管理",
    //     //   key: "steam2",
    //     //   label: h(
    //     //     "a",
    //     //     {
    //     //       href: "#/usermanagement",
    //     //     },
    //     //     "用户管理"
    //     //   ),
    //     //   icon: () => h(UserOutlined),
    //     // },
    //     // {
    //     //   title: "限流管理",
    //     //   key: "steam3",
    //     //   label: h(
    //     //     "a",
    //     //     {
    //     //       href: "#/currentlimiting",
    //     //     },
    //     //     "限流管理"
    //     //   ),
    //     //   icon: () => h(MailOutlined),
    //     // },
    //   // ],
    // },
    {
      key: "steam1",
      label: h(
        "a",
        {
          href: "#/sensitiveword",
        },
        "敏感词管理"
      ),
      icon: () => h(FontColorsOutlined),
      title: "敏感词管理",
    },
    {
      key: "steam2",
      label: h(
        "a",
        {
          href: "#/usermanagement",
        },
        "用户管理"
      ),
      icon: () => h(UserOutlined),
      title: "用户管理",
    },
    {
      key: "steam3",
      label: h(
        "a",
        {
          href: "#/currentlimiting",
        },
        "限流管理"
      ),
      icon: () => h(MailOutlined),
      title: "限流管理",
    },
  ];
} else {
  items.value = [
    {
      key: "mail",
      label: h(
        "a",
        {
          href: "#/home",
        },
        "欢迎"
      ),
      icon: () => h(SmileOutlined),
      title: "欢迎",
    },
    {
      key: "app",
      label: h(
        "a",
        {
          href: "#/interfacesquare",
        },
        "接口广场"
      ),
      icon: () => h(GlobalOutlined),
      title: "接口广场",
    },
  ];
}

const current = ref(["mail"]);
// const items = ref([
//   {
//     key: "mail",
//     label: h(
//       "a",
//       {
//         href: "#/home",
//       },
//       "欢迎"
//     ),
//     icon: () => h(SmileOutlined),
//     title: "欢迎",
//   },
//   {
//     key: "app",
//     label: h(
//       "a",
//       {
//         href: "#/interfacesquare",
//       },
//       "接口广场"
//     ),
//     icon: () => h(GlobalOutlined),
//     title: "接口广场",
//   },
//   {
//     key: "alipay",
//     label: "系统管理",
//     icon: () => h(AppstoreOutlined),
//     title: "系统管理",
//     children: [
//       {
//         title: "敏感词管理",
//         key: "steam1",
//         label: h(
//           "a",
//           {
//             href: "#/sensitiveword",
//           },
//           "敏感词管理"
//         ),
//         icon: () => h(FontColorsOutlined),
//       },
//       {
//         title: "用户管理",
//         key: "steam2",
//         label: h(
//           "a",
//           {
//             href: "#/usermanagement",
//           },
//           "用户管理"
//         ),
//         icon: () => h(UserOutlined),
//       },
//       {
//         title: "限流管理",
//         key: "steam3",
//         label: h(
//           "a",
//           {
//             href: "#/currentlimiting",
//           },
//           "限流管理"
//         ),
//         icon: () => h(MailOutlined),
//       },
//     ],
//   },
// ]);

const navRoute = () => {
  location.reload();
};
</script>

<style scoped lang="less">
.nav {
  width: 100%;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(3px);
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;

  display: flex;

  .nav_left {
    width: 1150px;

    display: flex;

    .nav_left_logo {
      width: 350px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;

      i {
        display: inline-block;
        width: 48px;
        height: 48px;
        background: url(../../../public/pictures/login_head.gif) no-repeat;
        background-size: 100% 100%;
        margin-right: 10px;
        margin-left: 20px;
      }

      span {
        font-size: 20px;
        font-weight: 600;
        vertical-align: top;
      }
    }

    .nav_left_route {
      width: 800px;
      border-bottom: none;
      // background-color: rgba(255, 255, 255, 0.06);
      // backdrop-filter: blur(3px);

      /deep/.ant-menu {
        font-size: 16px;
        height: 60px;
        line-height: 60px;
        background-color: rgba(255, 255, 255, 0.06) !important;
        backdrop-filter: blur(3px) !important;

        li:after {
          display: none;
          background-color: rgba(255, 255, 255, 0.06) !important;
          backdrop-filter: blur(3px) !important;
        }
      }
    }
  }

  .nav_right {
    width: calc(100% - 850px);
    height: 100%;
  }
}
/deep/:where(.css-dev-only-do-not-override-1hsjdkk).ant-menu-light {
  color: #757575 !important;
  background-color: rgba(255, 255, 255, 0) !important;
  backdrop-filter: blur(3px) !important;
  border-bottom: none;
}
/deep/.ant-menu-submenu-title {
  color: #757575 !important;
  background-color: rgba(255, 255, 255, 0) !important;
  backdrop-filter: blur(3px) !important;
  border-bottom: none;
}
/deep/:where(
    .css-dev-only-do-not-override-1hsjdkk
  ).ant-menu-light.ant-menu-horizontal
  > .ant-menu-item-selected {
  color: #0d0d0d !important;
}
::v-deep .ant-menu-light {
  background: rgba(255, 255, 255, 0) !important;
}
// /deep/.ant-menu-item-active li .ant-menu-title-content{
//   color: #757575 !important;
//   background-color: rgba(255, 255, 255, 0) !important;
//   backdrop-filter: blur(3px) !important;
//   border-bottom: none;
// }

::v-deep.ant-menu-vertical {
  background: rgba(255, 255, 255, 0) !important;
}
</style>