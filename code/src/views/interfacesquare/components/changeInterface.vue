<template>
  <div class="changeInterface">
    <a-form
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      @finish="onFinish"
    >
      <a-form-item label="接口名称：" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="请求地址：" name="url">
        <a-input v-model:value="formState.url" />
      </a-form-item>
      <a-form-item label="源地址：" name="url">
        <a-input v-model:value="formState.originalUrl" />
      </a-form-item>
      <a-form-item label="请输入描述信息：" name="description">
        <a-input v-model:value="formState.description" />
      </a-form-item>
      <a-form-item label="请求类型：" name="method">
        <a-radio-group v-model:value="formState.method">
          <a-radio value="get">GET</a-radio>
          <a-radio value="post">POST</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="请求类型：" name="status">
        <a-radio-group v-model:value="formState.status">
          <a-radio value="0">已上线</a-radio>
          <a-radio value="1">未上线</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="请求头：" name="requestHeader">
        <a-textarea v-model:value="formState.requestHeader" />
      </a-form-item>
      <a-form-item label="请求参数：" name="requestParams">
        <a-textarea v-model:value="formState.requestParams" />
      </a-form-item>
      <a-form-item label="响应头：" name="responseHeader">
        <a-textarea v-model:value="formState.responseHeader" />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" html-type="submit">提交修改</a-button>
        <a-button style="margin-left: 10px" @click="cancel('cancel')"
          >取消</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { Header } from "ant-design-vue/es/layout/layout";
import { defineComponent, reactive, toRaw, defineEmits } from "vue";
import { message } from "ant-design-vue";
import { updataInterFaceById } from "@/api/serve";
import { useRouter } from "vue-router";
const router = useRouter();
const emit = defineEmits(["changeCloseFlag"]);
let formState = reactive({
  name: "",
  url: "",
  originalUrl:"",
  description: "",
  method: "",
  requestHeader: "",
  requestParams: "0",
  responseHeader: "",
  status: "",
});

//自定义校验规则函数
const validaInterface = (rule, val, callback) => {
  if (!val) {
    return Promise.resolve();
  }
  let url = val;
  let validateResult = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  let objExp = new RegExp(validateResult);
  if (objExp.test(url) == false) {
    return Promise.reject(
      "请输入正确格式的接口地址！(请注意是http或https的格式)"
    );
  }
  return Promise.resolve();
};

const rules = {
  name: [
    {
      required: true,
      message: "请输入接口名称",
      // trigger: "blur",
    },
  ],
  url: [
    {
      required: true,
      message: "请输入接口地址",
      // trigger: "change",
    },
    {
      validator: validaInterface,
    },
  ],
  originalUrl: [
    {
      required: true,
      message: "请输入接口地址",
      // trigger: "change",
    },
    {
      validator: validaInterface,
    },
  ],
  description: [
    {
      required: true,
      message: "请一句话描述您的接口",
      // trigger: "change",
      // type: "object",
    },
  ],
  method: [
    {
      required: true,
      message: "请选择接口类型",
      // trigger: "change",
    },
  ],
  status: [
    {
      required: true,
      message: "请选择接口状态",
    },
  ],
  // requestHeader: [
  //   {
  //     required: true,
  //     message: "请输入接口的请求头",
  //     // trigger: "change",
  //   },
  // ],
  requestParams: [
    {
      required: true,
      message: "请输入接口的请求参数",
      // trigger: "blur",
    },
  ],
  // responseHeader: [
  //   {
  //     required: true,
  //     message: "请输入接口的响应头",
  //     // trigger: "blur",
  //   },
  // ],
};

const onFinish = () => {
  // console.log(formState);
  updataInterFaceByIdFun(formState);
};

const cancel = (value) => {
  emit("changeCloseFlag", {
    flag: false,
    title: value,
  });
};
let interFaceId = router.currentRoute.value.query.id;
const updataInterFaceByIdFun = async (formState) => {
  await updataInterFaceById("/interfaceInfo/update", {
    id: interFaceId,
    ...formState,
  }).then((res) => {
    console.log(res);
    if (res.code == 0 && res.message == "ok") {
      cancel("submit");
    }
  });
};
</script>

<style lang="less" scoped>
</style>