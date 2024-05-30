<template>
  <div class="interfacepage">
    <div class="interfacepage_title">
      <div class="parameter">
        <a-card
          :title="baseInfo.interFaceTitle"
          style="width: 100%; height: 100%; font-weight: 700"
        >
          <template #extra v-if="userFlag == 'admin'">
            <a-button @click="displayBox">修改接口信息</a-button>
          </template>
          <div class="parameter_div">
            <table class="parameter_table">
              <tr>
                <td>
                  <span class="span1">接口地址：</span>
                  <span class="span2" id="interfaceurl"
                    >{{ baseInfo.interFaceUrl }}</span
                  >
                  <a-tooltip title="Copy">
                    <a-button type="link" class="copyIcon" @click="CopyFun('interfaceurl')">
                      <CopyOutlined />
                    </a-button>
                  </a-tooltip>
                </td>
                <td>
                  <span class="span1">返回格式：</span>
                  <span class="span2">JSON</span>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <span class="span1">请求方式：</span>
                  <span>
                    <a-tag color="blue" v-if="baseInfo.interFaceMethod == 'get'">GET</a-tag>
                    <a-tag color="blue" v-else-if="baseInfo.interFaceMethod == 'post'">POST</a-tag>
                  </span>
                </td>
                <td>
                  <span class="span1">调用总次数：</span>
                  <span class="span2">10次</span>
                </td>
                <td>
                  <span class="span1">接口状态：</span>
                  <span class="span2" v-if="baseInfo.interFaceStatus == 0">
                    <a-badge status="processing" text="已上线" />
                  </span>
                  <span class="span2" v-else-if="baseInfo.interFaceStatus == 1">
                    <a-badge status="processing" text="未上线" />
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span class="span1">接口描述：</span>
                  <span class="span2">{{ baseInfo.interFaceDes }}</span>
                </td>
                <td>
                  <span class="span1">请求示例：</span>
                  <span class="span2" id="interfaceurl2"
                    >{{ baseInfo.interFaceUrl }}</span
                  >
                  <a-tooltip title="Copy">
                    <a-button type="link" class="copyIcon" @click="CopyFun('interfaceurl2')">
                      <CopyOutlined />
                    </a-button>
                  </a-tooltip>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
        </a-card>
      </div>
      <div class="documnet">
        <a-card style="width: 100%">
          <p>接口详细描述请前往开发者在线文档查看：</p>
          <a href="">接口在线文档</a>
        </a-card>
      </div>
    </div>
    <br />
    <div class="interfacepage_docment">
      <a-card
        style="width: 100%"
        :tab-list="tabListNoTitle"
        :active-tab-key="noTitleKey"
        @tabChange="(key) => onTabChange(key, 'noTitleKey')"
      >
        <template #customTab="item">
          <span v-if="item.key === 'API文档'">
            <FileTextOutlined />
            {{ item.key }}
          </span>
          <span v-else-if="item.key === '在线调试工具'">
            <BugOutlined />
            {{ item.key }}
          </span>
          <span v-else-if="item.key === '错误码参照'">
            <FileExclamationOutlined />
            {{ item.key }}
          </span>
          <span v-else-if="item.key === '示例代码'">
            <CodeOutlined />
            {{ item.key }}
          </span>
        </template>
        <div v-if="noTitleKey === 'API文档'" class="article">
          <p>请求参数说明：</p>
          <a-table
            :columns="columns"
            :data-source="data"
            :pagination="false"
            style="width: 800px"
          >
            <template #headerCell="{ column }">
              <template v-if="column.key === 'name'">
                <span> 参数名称 </span>
              </template>
            </template>
          </a-table>
          <p>
            响应参数说明：<a href="javascript:;" @click="goCradThree"
              >错误码参照</a
            >
          </p>
          <a-table
            :columns="xiangying_columns"
            :data-source="xiangying_data"
            :pagination="false"
            style="width: 800px"
          ></a-table>
          <a href="avascript:;" @click="goCradFour">见示例代码</a>
          <p>返回示例：</p>
          <div v-highlight>
            <pre
              style="margin-bottom: 0"
            ><code class="language-javascript" style="white-space: pre;padding:7px;background-color:#f8f8ff;">{
  "code": 0,
  "data": {
    "value": "这是一个接口的返回结果"
  },
  "message": "返回信息描述"
}</code></pre>
          </div>
        </div>
        <div v-else-if="noTitleKey === '在线调试工具'">在线调试工具</div>
        <div v-else-if="noTitleKey === '错误码参照'" class="cuowuma">
          <p>错误码：</p>
          <a-table
            :columns="cuowuma_columns"
            :data-source="cuowuma_data"
            :pagination="false"
            style="width: 800px"
          ></a-table>
        </div>
        <div v-else>示例代码</div>
      </a-card>
    </div>
  </div>

  <a-drawer
    title="修改接口信息"
    :placement="placement"
    :closable="true"
    :visible="visible"
    @close="onClose"
    height="750px"
  >
    <changeInterfaceVue @changeCloseFlag="setVisible" />
  </a-drawer>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import { interfacesquareById } from "@/api/serve";
import { useRouter } from "vue-router";
import changeInterfaceVue from "./changeInterface.vue";
import { copyFun } from "@/utils/copyFun";
import { useStore } from "@/store/index";
const usestore = useStore();
const router = useRouter();
const placement = ref("bottom");
const visible = ref(false);
// 管理员权限
let userFlag = ref([]);
if (usestore.getUserInfo.userRole == "admin") {
  userFlag.value = "admin";
} else {
  userFlag.value = "user";
}

// 基本数据
const baseInfo = reactive({
  interFaceTitle: "",
  interFaceDes: "",
  interFaceMethod: "",
  interFaceUrl: "",
  interFaceStatus: "",
});
// 请求接口
let interFaceId = router.currentRoute.value.query.id;
// console.log(interFaceId);
const getInterFacesData = async (interFaceId, baseInfo) => {
  await interfacesquareById("/interfaceInfo/get", {
    id: interFaceId,
  })
    .then((res) => {
      if (res.code == 0 && res.message == "ok") {
        baseInfo.interFaceTitle = res.data.name;
        baseInfo.interFaceDes = res.data.description;
        baseInfo.interFaceMethod = res.data.method;
        baseInfo.interFaceUrl = res.data.url;
        baseInfo.interFaceStatus = res.data.status;
      }
    })
    // .catch((err) => {});
};
getInterFacesData(interFaceId,baseInfo);

// titleCopy
const CopyFun = (idname) => {
  copyFun(idname);
};

const tabListNoTitle = [
  {
    key: "API文档",
    tab: "API文档",
  },
  {
    key: "在线调试工具",
    tab: "在线调试工具",
  },
  {
    key: "错误码参照",
    tab: "错误码参照",
  },
  {
    key: "示例代码",
    tab: "示例代码",
  },
];
const key = ref("tab1");
const noTitleKey = ref("API文档");
const onTabChange = (value, type) => {
  console.log(value, type);
  if (type === "key") {
    key.value = value;
  } else if (type === "noTitleKey") {
    noTitleKey.value = value;
  }
};

// documnet table
const columns = [
  {
    name: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "必选",
    dataIndex: "bixuan",
    key: "bixuan",
  },
  {
    title: "类型",
    dataIndex: "leixing",
    key: "leixing",
  },
  {
    title: "描述",
    key: "miaoshu",
    dataIndex: "miaoshu",
  },
];
const data = [
  {
    key: "1",
    name: "无",
    bixuan: "否",
    leixing: "String",
    miaoshu: "无",
  },
];

// xiangying table
const xiangying_columns = [
  {
    title: "参数说明",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "类型",
    dataIndex: "leixing",
    key: "leixing",
  },
  {
    title: "描述",
    dataIndex: "miaoshu",
    key: "miaoshu",
  },
];
const xiangying_data = [
  {
    key: "1",
    name: "code",
    bixuan: "否",
    leixing: "ing",
    miaoshu: "无",
  },
  {
    key: "2",
    name: "data.value",
    leixing: "String",
    miaoshu: "无",
  },
  {
    key: "3",
    name: "message",
    leixing: "String",
    miaoshu: "无",
  },
];

const goCradThree = () => {
  noTitleKey.value = "错误码参照";
};
const goCradFour = () => {
  noTitleKey.value = "示例代码";
};

// cuowuma table
const cuowuma_columns = [
  {
    title: "参数名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "错误码",
    dataIndex: "cuowuma",
    key: "cuowuma",
  },
  {
    title: "描述",
    dataIndex: "miaoshu",
    key: "miaoshu",
  },
];
const cuowuma_data = [
  {
    key: "1",
    name: "SUCCESS",
    cuowuma: "0",
    miaoshu: "ok",
  },
  {
    key: "2",
    name: "PARAMS_ERROR",
    cuowuma: "40000",
    miaoshu: "请求参数错误",
  },
  {
    key: "3",
    name: "NO_AUTH_ERROR",
    cuowuma: "40101",
    miaoshu: "无权限",
  },
  {
    key: "4",
    name: "FORBIDDEN_ERROR",
    cuowuma: "40300",
    miaoshu: "禁止访问",
  },
  {
    key: "5",
    name: "NOT_FOUND_ERROR",
    cuowuma: "40400",
    miaoshu: "请求数据不存在",
  },
  {
    key: "6",
    name: "SYSTEM_ERROR",
    cuowuma: "50000",
    miaoshu: "系统内部异常",
  },
  {
    key: "7",
    name: "OPERATION_ERROR",
    cuowuma: "50001",
    miaoshu: "操作失败",
  },
];

const onClose = () => {
  visible.value = false;
};

const displayBox = () => {
  visible.value = true;
};

const setVisible = (value) => {
  visible.value = value.flag;
  let getRequestFlag = value.title;
  if (getRequestFlag === "submit") {
    console.log(interFaceId,baseInfo,'111');
    getInterFacesData(interFaceId,baseInfo);
  }
};
</script>

<style lang="less" scoped>
.interfacepage {
  width: 100%;
  // overflow: scroll;
  padding: 30px 0;
  padding-bottom: 50px;
  background: linear-gradient(#fbfbfb 0%, #f5f5f5 100%);

  .interfacepage_title {
    width: 85%;
    height: 360px;
    margin: 0 auto;

    .parameter {
      width: 100%;
      height: 250px;
      // background-color: antiquewhite;

      .parameter_div {
        width: 100%;
        height: 145px;
        .parameter_table {
          width: 100%;
          tr {
            display: flex;

            td {
              flex: 1;

              .span1 {
                color: rgba(0, 0, 0, 0.45);
                font-weight: normal;
                font-size: 14px;
                // line-height: 1.5714285714285714;
                text-align: start;
              }
              .span2 {
                color: rgba(0, 0, 0, 0.88);
                font-weight: 400;
                font-size: 14px;
                word-break: break-word;
                overflow-wrap: break-word;
              }
            }
          }

          tr:nth-child(1) {
            height: 53px;
          }
          tr:nth-child(2) {
            height: 39px;
          }
          tr:nth-child(3) {
            height: 53px;
          }
        }
      }
    }
    .documnet p {
      font-size: 14px;
      font-weight: 700;
      color: #555;
      padding-left: 14px;
      height: 16px;
      line-height: 16px;
      margin-bottom: 18px;
      position: relative;
    }
    .documnet p::before {
      content: "";
      width: 4px;
      height: 16px;
      background: #00aeff;
      border-radius: 2px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .interfacepage_docment {
    width: 85%;
    margin: 0 auto;

    .article {
      width: 100%;

      p {
        font-size: 14px;
        font-weight: 700;
        color: #555;
        padding-left: 14px;
        height: 16px;
        line-height: 16px;
        margin-top: 15px;
        margin-bottom: 18px;
        position: relative;
      }
      p::before {
        content: "";
        width: 4px;
        height: 16px;
        background: #00aeff;
        border-radius: 2px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .cuowuma {
      width: 100%;

      p {
        font-size: 14px;
        font-weight: 700;
        color: #555;
        padding-left: 14px;
        height: 16px;
        line-height: 16px;
        margin-top: 15px;
        margin-bottom: 18px;
        position: relative;
      }
      p::before {
        content: "";
        width: 4px;
        height: 16px;
        background: #00aeff;
        border-radius: 2px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}
/deep/.copyIcon {
  padding: 0;
  height: 19px;
  margin: 0 5px;
  vertical-align: top;
}
</style>