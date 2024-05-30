<template>
  <div class="usermanagement">
    <div class="usermanagement_box">
      <a-table :columns="columns" :data-source="data" bordered>
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'name'">
            {{ text }}
          </template>
          <template v-if="column.dataIndex === 'address'">
            <a-button class="fasongyoujian" @click="fasongyoujianFun(record)"
              >发送邮件</a-button
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

        <template #title>用户信息</template>
        <!-- <template #footer>Footer</template> -->
      </a-table>
    </div>
  </div>

  <a-modal v-model:open="open" title="请输入预警信息" @ok="handleOk">
    <a-textarea
      v-model:value="yujingvalue"
      placeholder="请输入您的预警信息"
      :rows="6"
    />
  </a-modal>
</template>

<script setup>
import { ref, reactive } from "vue";
import { requestListUser, deleteUser,addYuJinci } from "@/api/serve";
import { message } from "ant-design-vue";
const columns = [
  {
    title: "序号",
    dataIndex: "key",
    width: "10%",
  },
  {
    title: "用户名称",
    dataIndex: "name",
    width: "15%",
  },
  {
    title: "用户ID",
    dataIndex: "userId",
    width: "40%",
  },
  {
    title: "用户角色",
    // className: "column-money",
    dataIndex: "Permissions",
    width: "15%",
  },
  {
    title: "用户操作",
    dataIndex: "address",
    width: "20%",
  },
];
const open = ref(false);
const data = reactive([]);
const yujingvalue = ref("");
const yonghuInfo = reactive({});
// 删除用户
const deleteUserInfo = (userId) => {
  deleteUser("/user/delete", {
    id: userId,
  }).then((res) => {
    if (res.code == "0") {
      requestListUserFun(data);
      message.success("删除成功！！！");
    }
  });
};

const onDelete = (key) => {
  let obj;
  data.map((item) => {
    if (item.key == key) {
      obj = item;
    }
  });
  // console.log(obj);
  // 调用删除用户的接口，将id传进入，然后重新请求用户列表
  deleteUserInfo(obj.userId);
};

// 请求用户列表
const requestListUserFun = async (tableData) => {
  tableData.length = 0;
  await requestListUser("/user/list", {}).then((res) => {
    let obj;
    res.data.map((item, id) => {
      // console.log(item);
      obj = {
        key: id,
        name: item.userAccount,
        Permissions: item.userRole,
        userId: item.id,
        email: item.userMailbox,
      };
      tableData.push(obj);
    });
  });
};
requestListUserFun(data);

const fasongyoujianFun = (data) => {
  open.value = true;
  yonghuInfo.value = data;
};
const addYuJinciFun = async (data,yujingvalue) => {
  let params = {
    userId:data.userId,
    userMailbox:data.email,
    warningText:yujingvalue.value
  };
  await addYuJinci("/earlyWarning/add", params).then((res) => {
    console.log(params);
    if (res.code == "0") {
      message.success('邮箱发送成功！！！');
    }
  });
};
const handleOk = (e) => {
  open.value = false;
  if (yonghuInfo.value.email == null) {
    message.error("该用户的邮箱为空！！！");
    return;
  } else {
    // 发送预警信息
    addYuJinciFun(yonghuInfo.value,yujingvalue);
  }
};

</script>

<style lang="less" scoped>
.usermanagement {
  width: 100%;
  min-height: calc(100vh - 60px);
  padding: 30px 0;
  padding-bottom: 50px;
  background: linear-gradient(#fbfbfb 0%, #f5f5f5 100%);

  .usermanagement_box {
    width: 85%;
    margin: 0 auto;
    // background-color: #fff;
  }
}

th.column-money,
td.column-money {
  text-align: right !important;
}
.fasongyoujian {
  margin-right: 20px;
}
</style>