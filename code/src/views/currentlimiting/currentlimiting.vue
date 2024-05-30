<template>
  <div class="currentlimiting">
    <div class="currentlimiting_box">
      <a-table :columns="columns" :data-source="data" bordered>
        <!-- <template #extra>
          <a-tooltip title="添加限流信息">
            <a-button @click="showModal()">添加限流信息</a-button>
          </a-tooltip>
        </template> -->
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'name'">
            {{ text }}
          </template>
          <template v-if="column.dataIndex === 'caozuo'">
            <a-button class="fasongyoujian" @click="xiugai(record, 'xiugai')"
              >修改限流配置</a-button
            >
            <a-popconfirm
              v-if="data.length"
              title="是否确认删除？"
              @confirm="onDelete(record.key)"
            >
              <a-button>删除</a-button>
            </a-popconfirm>
          </template>
        </template>

        <template #title>
          <span class="span">限流管理</span>
          <a-tooltip title="添加限流信息">
            <a-button @click="showModal()">添加限流信息</a-button>
          </a-tooltip>
        </template>
      </a-table>
    </div>
  </div>

  <div class="drawer">
    <a-drawer
      title="修改限流的配置"
      :placement="placement"
      :closable="false"
      :open="open"
      @close="onClose"
      height="750px"
    >
      <a-form
        :layout="formState.layout"
        :model="formState"
        v-bind="formItemLayout"
        @finish="onFinish"
      >
        <a-form-item label="率">
          <a-input v-model:value="formState.rate" placeholder="率" />
        </a-form-item>
        <a-form-item label="速率时间间隔">
          <a-input
            v-model:value="formState.rateInterval"
            placeholder="速率时间间隔"
          />
        </a-form-item>
        <a-form-item label="速率时间间隔单位">
          <!-- <a-input
            v-model:value="formState.rateIntervalUnit"
            placeholder="速率时间间隔单位"
          /> -->
          <a-select
            v-model:value="formState.rateIntervalUnit"
            placeholder="速率时间间隔单位"
          >
            <a-select-option value="MILLISECONDS">MILLISECONDS</a-select-option>
            <a-select-option value="SECONDS">SECONDS</a-select-option>
            <a-select-option value="MINUTES">MINUTES</a-select-option>
            <a-select-option value="HOURS">HOURS</a-select-option>
            <a-select-option value="DAYS">DAYS</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="速率限制器路标">
          <a-input
            v-model:value="formState.roadSigns"
            placeholder="速率限制器路标"
          />
        </a-form-item>
        <a-form-item label="限流场景（1.路径 2.用户）">
          <!-- <a-input
            v-model:value="formState.scene"
            placeholder="限流场景（1.路径 2.用户）"
          /> -->
          <a-select
            v-model:value="formState.scene"
            placeholder="限流场景（1.路径 2.用户）"
          >
            <a-select-option value="1">路径</a-select-option>
            <a-select-option value="2">用户</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="状态值，可枚举（1.正常 2.拥堵 3.繁忙）">
          <!-- <a-input
            v-model:value="formState.state"
            placeholder="状态值，可枚举（1.正常 2.拥堵 3.繁忙）"
          /> -->
          <a-select
            v-model:value="formState.state"
            placeholder="状态值，可枚举（1.正常 2.拥堵 3.繁忙）"
          >
            <a-select-option value="1">正常</a-select-option>
            <a-select-option value="2">拥堵</a-select-option>
            <a-select-option value="3">繁忙</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="使用状态（0.启用 1.禁用）">
          <!-- <a-input
            v-model:value="formState.usageStatus"
            placeholder="使用状态（0.启用 1.禁用）"
          /> -->
          <a-radio-group v-model:value="formState['usageStatus']">
            <a-radio value="0">启用</a-radio>
            <a-radio value="1">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="备注">
          <a-input v-model:value="formState.remark" placeholder="备注" />
        </a-form-item>
        <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
          <a-button type="primary" html-type="submit">确认修改</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { message } from "ant-design-vue";
import {
  listCurrentLimting,
  deleteCurrentLimting,
  addCurrentLimting,
  updataCurrentLimting,
} from "@/api/serve";
const columns = [
  {
    title: "序号",
    dataIndex: "key",
    width: "2%",
  },
  {
    title: "用户ID",
    dataIndex: "userId",
    width: "7%",
  },
  {
    title: "用户名",
    dataIndex: "username",
    width: "3%",
  },
  {
    title: "率",
    dataIndex: "rate",
    width: "2%",
  },
  {
    title: "速率时间间隔",
    // className: "column-money",
    dataIndex: "rateInterval",
    width: "2%",
  },
  {
    title: "速率时间间隔单位",
    dataIndex: "rateIntervalUnit",
    width: "2%",
  },
  {
    title: "限流场景（1.路径 2.用户）",
    dataIndex: "scene",
    width: "2%",
  },
  {
    title: "备注",
    dataIndex: "remark",
    width: "10%",
  },
  {
    title: "速率限制器路标",
    dataIndex: "roadSigns",
    width: "10%",
  },
  {
    title: "状态值，可枚举（1.正常 2.拥堵 3.繁忙）",
    dataIndex: "state",
    width: "2%",
  },
  {
    title: "使用状态（0.启用 1.禁用）",
    dataIndex: "usageStatus",
    width: "2%",
  },
  {
    title: "操作",
    dataIndex: "caozuo",
    width: "10%",
  },
  // {
  //   title: "id",
  //   dataIndex: "ID",
  //   width: "10%",
  // },
];
const data = reactive([]);
const formState = reactive({
  rate: "",
  rateInterval: "",
  rateIntervalUnit: "MILLISECONDS",
  roadSigns: "",
  scene: "1",
  state: "1",
  usageStatus: "1",
  remark: "",
});

const dangqianxiugai = reactive({});

const getListCurrentLimting = async (xianliudata) => {
  xianliudata.length = 0;
  await listCurrentLimting("/rateLimiterAllocation/list/page", {
    current: 1,
    pageSize: 10,
  }).then((res) => {
    // console.log(res);
    if (res.code == 0) {
      res.data.records.map((item, id) => {
        let obj = {
          key: id,
          userId: item.createUserId,
          username: item.createUserName,
          rate: item.rate,
          rateInterval: item.rateInterval,
          rateIntervalUnit: item.rateIntervalUnit,
          remark: item.remark,
          roadSigns: item.roadSigns,
          scene: item.scene,
          state: item.state,
          usageStatus: item.usageStatus,
          id: item.id,
        };
        xianliudata.push(obj);
      });
    }
  });
};
getListCurrentLimting(data);

const xiugai = (data, flag) => {
  open.value = true;
  dangqianxiugai.value = data;
};

const placement = ref("bottom");
const open = ref(false);
const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};

const formItemLayout = computed(() => {
  const { layout } = formState;
  return layout === "horizontal"
    ? {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      }
    : {};
});
const buttonItemLayout = computed(() => {
  const { layout } = formState;
  return layout === "horizontal"
    ? {
        wrapperCol: {
          span: 14,
          offset: 4,
        },
      }
    : {};
});

const onFinish = () => {
  open.value = false;
  updataCurrentLimtingFun(formState, dangqianxiugai);
};

const updataCurrentLimtingFun = async () => {
  // console.log(111);
  let params = {
    id: dangqianxiugai.value.id,
    ...formState,
  };
  // console.log(params);
  await updataCurrentLimting("/rateLimiterAllocation/update", params).then(
    (res) => {
      if (res.code == 0) {
        message.success("修改限流配置成功！！！");
        getListCurrentLimting(data);
      }
      console.log(res);
    }
  );
};

const onDelete = () => {};

const showModal = () => {
  open.value = true;
};
</script>

<style lang="less" scoped>
.currentlimiting {
  width: 100%;
  min-height: calc(100vh - 60px);
  padding: 30px 0;
  padding-bottom: 50px;
  background: linear-gradient(#fbfbfb 0%, #f5f5f5 100%);

  .currentlimiting_box {
    width: 85%;
    margin: 0 auto;
    // background-color: #fff;
  }

  .drawer {
    width: 70%;
  }
}

th.column-money,
td.column-money {
  text-align: right !important;
}
.fasongyoujian {
  margin-right: 20px;
}

/deep/.ant-table-title {
  display: flex;
  justify-content: space-between;

  .span {
    line-height: 32px;
    font-weight: 700;
  }
}
</style>