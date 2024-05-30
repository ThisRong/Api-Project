<template>
  <div class="userinfo">
    <a-card :bordered="false" class="userinfoBox">
      <a-card title="个人信息设置" style="width: 100%">
        <template #extra>
          <a-tooltip title="用于修改用户密码">
            <a-button @click="showModal('password')">修改密码</a-button>
          </a-tooltip>
          <a-tooltip title="用于修改用户邮箱">
            <a-button style="margin-left: 10px" @click="showModal('emils')">更新邮箱</a-button>
          </a-tooltip>
          <a-tooltip title="提交修改的信息">
            <a-button style="margin-left: 10px" @click="goSubmit"
              >提交修改</a-button
            >
          </a-tooltip>
        </template>
        <div class="userImage" style="display: none">
          <a-upload
            v-model:file="fileList"
            name="avatar"
            maxCount="1"
            :show-upload-list="false"
            list-type="picture-card"
            class="avatar-uploader"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <div v-if="imageUrl" class="userImg">
              <img :src="imageUrl" alt="avatar" />
            </div>
            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </div>
        <table class="gerenInfo_table">
          <tr>
            <td>
              <div>
                <span>昵称：</span>
                <span>{{ userBaseInfo.username }}</span>
                <span>
                  <a-tooltip title="编辑" @click="showModal('name')">
                    <a-button type="link" class="copyIcon">
                      <EditOutlined />
                    </a-button>
                  </a-tooltip>
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <span>我的邀请码：</span>
                <span id="yaoqingma">nlIa7eiX</span>
                <span>
                  <a-tooltip title="Copy" @click="handleCopy('yaoqingma')">
                    <a-button type="link" class="copyIcon">
                      <CopyOutlined />
                    </a-button>
                  </a-tooltip>
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <span>我的id：</span>
                <span id="wodeid">{{ userBaseInfo.userId }}</span>
                <span>
                  <a-tooltip title="Copy" @click="handleCopy('wodeid')">
                    <a-button type="link" class="copyIcon">
                      <CopyOutlined />
                    </a-button>
                  </a-tooltip>
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <span>我的性别：</span>
                <span>
                  <a-radio-group v-model:value="userBaseInfo.userGender">
                    <a-radio value="0">男</a-radio>
                    <a-radio value="1">女</a-radio>
                  </a-radio-group>
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <span>我的邮箱：</span>
                <!-- <span id="wodeyoux">2306767989@qq.com</span> -->
                <span
                  >{{ userBaseInfo.userEmil }}
                  <!-- <a-tooltip title="Copy" @click="handleCopy('wodeyoux')"> -->
                  <a-button type="link" class="copyIcon">
                    <CopyOutlined />
                  </a-button>
                  <!-- </a-tooltip> -->
                </span>
              </div>
            </td>
          </tr>
        </table>
      </a-card>
      <br />
      <a-card title="开发者凭证（调用接口的凭证）" style="width: 100%">
        <template #extra>
          <a-button @click="getPingzheng">更新凭证</a-button>
        </template>
        <div>
          <table class="pingzheng_table">
            <tr>
              <td>
                <div>
                  <span>AccessKey：</span>
                  <span id="AccessKey">{{ stringAKSK1 }}</span>
                  <span>
                    <a-tooltip title="Copy" @click="handleCopy('AccessKey')">
                      <a-button type="link" class="copyIcon">
                        <CopyOutlined />
                      </a-button>
                    </a-tooltip>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <span>SecretKey：</span>
                  <span id="SecretKey">{{ stringAKSK2 }}</span>
                  <span>
                    <a-tooltip title="Copy" @click="handleCopy('SecretKey')">
                      <a-button type="link" class="copyIcon">
                        <CopyOutlined />
                      </a-button>
                    </a-tooltip>
                  </span>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </a-card>
      <br />
      <a-card
        title="开发者 SDK（快速接入API接口）"
        style="width: 100%"
        class="sdkDownload"
      >
        <a-button style="height: 40px; font-size: 16px" @click="DownloadJDK">
          <DownloadOutlined />
          Java JDK
        </a-button>
      </a-card>
    </a-card>

    <a-modal
      :title="modelTitle"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <a-input
        v-if="modelTitle == '请修改您的用户名'"
        v-model:value="userName"
        placeholder="请修改您的用户名"
      />
      <a-input-password v-else-if="modelTitle == '请输入您的密码'" v-model:value="userPasswords" placeholder="请修改您的密码" />
      <a-input v-else v-model:value="userEmils" placeholder="请修改您的邮箱" />
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { message } from "ant-design-vue";
import { copyFun } from "@/utils/copyFun";
import { useStore } from "@/store/index";
import { useRouter } from "vue-router";
import { updataUser, getRequestUser, getAKSK,genxinAKSK } from "@/api/serve";
import { computeAKSKFun } from "@/utils/computeAKSK";
import CryptoJS from 'crypto-js';
// import bus from "@/utils/eventBus";
const router = useRouter();
const usestore = useStore();
let fileList = ref([]);
let loading = ref(false);
let imageUrl = ref("");
let visible = ref(false);
let confirmLoading = ref(false);
let modelTitle = ref("");
let nameoremil = ref(0);

// 用户名和邮箱
let userName = ref("");
let userEmils = ref("");
let userPasswords = ref("");

// AKSK
let stringAKSK1 = ref("");
let stringAKSK2 = ref("");
// 用户数据初始化
// let userinfo = reactive({});
// userinfo = usestore.getUserInfo;
// console.log(userinfo);
// 用户基本信息
const userBaseInfo = reactive({
  username: "",
  userEmil: "",
  userId: "",
  userImg: "",
  userName: "",
  userGender: "0",
  userPassword:''
});

// 请求当前登录者的
const getRequestUserFun = async (userBaseInfo) => {
  await getRequestUser("/user/get/login", {}).then((res) => {
    if (res.code == 0 && res.message == "ok") {
      (userBaseInfo.username = res.data.userAccount),
        (userBaseInfo.userId = res.data.id),
        (userBaseInfo.userEmil = res.data.userMailbox),
        (userBaseInfo.userName = res.data.userName);
      userBaseInfo.userImg = res.data.userAvatar;

      usestore.userLoginFlag(res.data);
      sessionStorage.setItem("userInfo", { ...res.data });
    }
  });
};
getRequestUserFun(userBaseInfo);

// 图片转化的函数
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
// 点击上传图片的回调函数
const handleChange = (info) => {
  getBase64(info.file, (base64Url) => {
    imageUrl.value = base64Url;
    loading.value = false;
  });
};
// 图片上传前：图片大小类型判断
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error("Image must smaller than 10MB!");
  }
  return false;
};
// 监听器
watch(imageUrl, (newVlaue, _) => {
  userBaseInfo.userImg = newVlaue;
});
// 复制函数
const handleCopy = (id) => {
  copyFun(id);
};
// 修改信息弹窗
const showModal = (value) => {
  if (value == "name") {
    nameoremil.value = 1;
    modelTitle.value = "请修改您的用户名";
  } else if (value == "emils") {
    nameoremil.value = 2;
    modelTitle.value = "请修改您的邮箱";
  }else if(value == "password"){
    nameoremil.value = 3;
    modelTitle.value = "请输入您的密码"
  }
  visible.value = true;
};
// 修改后提交回调函数
const handleOk = () => {
  if (nameoremil.value === 1) {
    userBaseInfo.username = userName.value;
    userName.value = "";
  } else if (nameoremil.value === 2) {
    userBaseInfo.userEmil = userEmils.value;
    userEmils.value = "";
  }else if(nameoremil.value === 3){
    userBaseInfo.userPassword = userPasswords.value;
    userPasswords.value = "";
    getUpdataUser();
  }
  visible.value = false;
};

const getUpdataUser = async () => {
  await updataUser("/user/update", {
    id: userBaseInfo.userId,
    userAccount: userBaseInfo.username,
    userAvatar: userBaseInfo.userImg,
    userMailbox: userBaseInfo.userEmil,
    userName: userBaseInfo.userName,
    userPassword:userBaseInfo.userPassword
  }).then((res) => {
    if (res.code == "0" && res.message == "ok") {
      // getRequestUserFun(userBaseInfo);
      message.success("用户信息修改成功！！！");
      location.reload();
    }
  });
};

// 提交修改
const goSubmit = () => {
  // console.log(userBaseInfo);
  getUpdataUser();
  // bus.emit("send", 1);
};
// 点击下载JDK的回调
const DownloadJDK = () => {
  let a = document.createElement("a");
  a.download = "JDK";
  a.style.display = "none";
  a.href = "/jdk.zip";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// 更新凭证触发事件
const getPingzheng = () => {
  let id = userBaseInfo.userId;
  genxinAKSKFun(id);
};


// 更新凭证
const genxinAKSKFun =async (id) => {
  let params = {
    id:id
  }
  await genxinAKSK('/user/resetAccessKey',params).then((res)=>{
    if(res.code == '0'){
      console.log(111);
      getPingzhengFun();
    }
  })
}
//获取base64
const getPingzhengFun = async () => {
  await getAKSK('/user/getSignatureVoucher',{}).then((res)=>{
    if(res.code == 0 && res.message == "ok"){
      console.log(222);
      setPingzheng(res.data);
    }
  });
};
// AKSK算法
const setPingzheng = (data) => {
  let id = userBaseInfo.userId;
  let youxiang = userBaseInfo.userEmil;
  let str = computeAKSKFun(id, youxiang);
  let encryptedData01 = data.accessKeyBytes.replace(/\s/g,'');
  let encryptedData02 = data.secretKeyBytes.replace(/\s/g,'');
  // .replace(/\s/g,'')
  let str01 = decryptAES(encryptedData01,str);
  let str02 = decryptAES(encryptedData02,str);
  console.log(str01,str02);
  // console.log(333);
  stringAKSK1.value = str01;
  stringAKSK2.value = str02;
  // console.log(stringAKSK1.value,stringAKSK1.value);
}

// 这里有问题
const decryptAES = (encryptedData,key) => {
 const parsedKey = CryptoJS.enc.Utf8.parse(key);
//  console.log(parsedKey,'123321');
 const decryptedData = CryptoJS.AES.decrypt(encryptedData,parsedKey,{
   mode:CryptoJS.mode.ECB,
   padding:CryptoJS.pad.Pkcs7
 });
//  console.log(parsedKey,decryptedData,'123');
 return decryptedData.toString(CryptoJS.enc.Utf8);
}
watch(
  userBaseInfo,
  (newVlaue, _) => {
    genxinAKSKFun(newVlaue.userId);
  },
  {
    deep: true,
  }
);
</script>

<style lang="less" scoped>
.userinfo {
  width: 100%;
  padding: 30px 0;
  padding-bottom: 50px;
  background: linear-gradient(#fbfbfb 0%, #f5f5f5 100%);

  .userinfoBox {
    width: 85%;
    margin: 0 auto;
    background-color: #fff;

    .gerenInfo_table {
      width: 100%;

      & tr td {
        padding-bottom: 16px;
        div {
          height: 36px;
        }
      }
    }

    .pingzheng_table {
      width: 100%;

      & tr td {
        padding-bottom: 16px;
        div {
          height: 36px;
        }
      }
    }

    /deep/.sdkDownload .ant-card-body {
      padding: 16px 24px !important;
    }
  }
}
/deep/:where(
    .css-dev-only-do-not-override-1hsjdkk
  ).ant-upload-wrapper.ant-upload-picture-card-wrapper
  .ant-upload.ant-upload-select {
  border-radius: 50%;
}
/deep/.copyIcon {
  padding: 0;
  height: 19px;
  margin: 0 5px;
  vertical-align: top;
}
.userImg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 200%;
  }
}
</style>