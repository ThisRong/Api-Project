<template>
  <div class="interfacesquareDom">
    <div class="interFacesDataList">
      <div
        v-for="item in interFacesDataList"
        :key="item"
        class="listItem"
        @click="goInterfaceRoute(item.interFaceId)"
      >
        <div class="itemImg">
          <img :src="item.iconfontUrl" alt="" />
        </div>
        <p>{{ item.title }}</p>
        <span>{{ item.textArea }}</span>
      </div>
      <div class="addInterface listItem" @click="showDrawer" v-if="userFlag == 'admin'">
        <div class="itemImg">
          <img src="/pictures/interface/tianjia1.svg" alt="" />
        </div>
        <p>添加接口</p>
        <span>请点击添加您的接口吧！！！</span>
      </div>
    </div>
  </div>
  <a-drawer
    title="接口描述信息"
    :placement="placement"
    :closable="true"
    :visible="visible"
    @close="onClose"
    height="750px"
  >
    <addInterface @setCloseFlag="setVisible"/>
  </a-drawer>
</template>

<script setup>
import addInterface from './addInterface.vue'
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store/index";
import { interfacesquareInfo } from "@/api/serve";
import { randomFun } from '@/utils/randomNameFun';
const placement = ref("bottom");
const visible = ref(false);
const router = useRouter();
const usestore = useStore();
let userFlag = ref(null);
if(usestore.getUserInfo.userRole == 'admin'){
  userFlag.value = 'admin'
}else{
  userFlag.value = 'user'
}

const interFacesDataList = reactive([]);
// 发送请求：请求接口列表
const getInterFacesDataList =async (interFacesDataList) => {
  // let array = [];
  interFacesDataList.length = 0;
  await interfacesquareInfo("/interfaceInfo/list/page",{
    current:1,
    pageSize:10,
  })
    .then((res) => {
      if (res.code == 0 && res.message == "ok") {
        let data = res.data.records;
        data.map((item)=>{
          let picUrl = randomFun();
          let obj = {
            title:item.name,
            textArea:item.description,
            iconfontUrl:picUrl,
            interFaceId:item.id
          };
          interFacesDataList.push(obj);
        });
      }
      console.log(res);
    })
    .catch((err) => {});
};
getInterFacesDataList(interFacesDataList);

const goInterfaceRoute = (interFaceId) => {
  router.push({ path: "/interfacepage", query: { id: interFaceId } });
};

// 弹出层
const showDrawer = () => {
  visible.value = true;
};
const onClose = () => {
  visible.value = false;
};

const setVisible = (value)=>{
  visible.value = value.flag;
  let getRequestFlag = value.title;
  if(getRequestFlag === "submit"){
    getInterFacesDataList(interFacesDataList);
  }
}

// randomFun();
</script>

<style scoped lang="less">
.interfacesquareDom {
  width: 85%;
  margin: 0 auto;
  margin-bottom: 50px;

  .interFacesDataList {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    // align-content: space-around;
    flex-wrap: wrap;

    .listItem {
      width: 18%;
      height: 380px;
      margin-right: 2.5%;
      background-color: white;
      overflow: hidden;
      border-radius: 10px;
      margin-bottom: 30px;
      user-select: none;
      transition: all 0.5s linear; /*持续时间*/

      &:after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 3;
        background-image: radial-gradient(
          circle,
          #00000067 10%,
          rgba(0, 0, 0, 0) 10.01%
        );
        background-repeat: no-repeat;
        background-position: 50%;
        transform: scale(10);
        opacity: 0;
        transition: transform 0.5s, opacity 1s;
      }

      &:active:after {
        transform: scale(0);
        opacity: 0.2;
        transition: 0s;
      }

      .itemImg {
        width: 50%;
        margin: 30px auto 30px;
        border-radius: 20px;
        z-index: 5;
        overflow: hidden;
        transition: all 0.5s linear; /*持续时间*/

        img {
          width: 100%;
          height: 100%;
          -webkit-user-drag: none;
          transition: all 0.5s linear; /*持续时间*/
        }
      }

      p {
        font-size: 20px;
        font-weight: 700;
        width: 70%;
        z-index: 5;
        margin: 0 auto;
        text-align: center;
        margin-bottom: 30px;
      }
      span {
        display: block;
        width: 80%;
        height: 100px;
        z-index: 5;
        text-align: center;
        margin: 0 auto;
      }
    }
    .listItem:nth-child(5n) {
      margin-right: 0;
    }
    .listItem:hover {
      transform: translateY(-7px);
      box-shadow: 0 0 20px 2px #918f8f; /*盒子阴影*/
      transition: all 0.5s linear; /*持续时间*/
      cursor: pointer;
    }
    .listItem:hover .itemImg {
      border-radius: 50%;
      transition: all 0.5s linear; /*持续时间*/
    }
    .listItem:hover img {
      transform: scale(1.2);
      // transform-origin: 10px 10px;
      transition: all 0.5s linear; /*持续时间*/
    }

    .addInterface img {
      width: 50%;
    }
    .addInterface:hover .itemImg {
      border-radius: 0%;
      transition: all 0s linear; /*持续时间*/
    }
    .addInterface:hover img {
      transform: scale(1);
      // transform-origin: 10px 10px;
      transition: all 0.5s linear; /*持续时间*/
    }
  }
}
</style>