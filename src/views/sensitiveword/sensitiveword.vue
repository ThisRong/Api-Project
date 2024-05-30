<template>
  <div class="sensitiveword">
    <div class="sensitivewordBox">
      <a-card title="敏感词筛选" :bordered="true" style="width: 100%">
        <template #extra>
          <a-button @click="showModal">增加敏感词汇及语句</a-button>
        </template>
        <a-table bordered :data-source="dataSource" :columns="columns" :total="1000">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'operation'">
              
              <a-popconfirm
                v-if="dataSource.length"
                title="是否删除?"
                @confirm="onDelete(record.wordId)"
              >
                <a>删除</a>
                
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </a-card>
    </div>
  </div>
  <a-modal v-model:open="open" title="请输入一条敏感词汇或语句" @ok="handleOk">
    <a-textarea
      v-model:value="value1"
      placeholder="Autosize height based on content lines"
      :auto-size="{ minRows: 3, maxRows: 5 }"
    />
  </a-modal>
</template>

<script setup>
import { reactive, watch, ref } from "vue";
import { message } from "ant-design-vue";
import {
  listSensitiveWord,
  addSensitiveWord,
  deleSensitiveWord,
  updataSensitiveWord,
} from "@/api/serve";
const open = ref(false);
const value1 = ref("");
const columns = [
  {
    title: "序号",
    dataIndex: "key",
    width: "10%",
  },
  {
    title: "敏感词汇及语句",
    dataIndex: "wordsName",
    width: "60%",
  },

  // {
  //   title: 'address',
  //   dataIndex: 'address',
  // },
  {
    title: "操作项",
    dataIndex: "operation",
  },
];
const dataSource = reactive([]);

// 获取所有预警词汇列表 ： 接口调用
const getListSensitiveWord = async (dataSource) => {
  dataSource.length = 0;
  await listSensitiveWord("/wmsensitiveInfo/list/page", {
    current: 1,
    pageSize: 1000,
  }).then((res) => {
    if (res.code == 0 && res.message == "ok") {
      res.data.records.map((item, id) => {
        let obj = {
          key: id + 1,
          wordId: item.id,
          wordsName: item.sensitives,
        };
        // console.log(item);
        dataSource.push(obj);
      });
      // console.log(res);
    }
  });
};
getListSensitiveWord(dataSource);

// 增加敏感词的接口
const getAddSensitiveWord = async (value) => {
  await addSensitiveWord("/wmsensitiveInfo/add", {
    keyword: value,
  }).then((res) => {
    if (res.code == "0" && res.message == "ok") {
      getListSensitiveWord(dataSource);
      message.success("添加敏感词成功！！！");
    }
  });
};


// 删除某一个敏感词的接口
const getDeleSensitiveWord =async (keys) => {
  await deleSensitiveWord("/wmsensitiveInfo/delete", {
    id: Number(keys),
  }).then((res) => {
    if (res.code == "0" && res.message == "ok") {
      getListSensitiveWord(dataSource);
      message.success("删除敏感词成功！！！");
    }
  });
};

const onDelete = (key) => {
  let keys = key;
  getDeleSensitiveWord(keys);
};

const showModal = () => {
  open.value = true;
  value1.value = "";
};
const handleOk = (e) => {
  getAddSensitiveWord(value1.value);
  open.value = false;
};

// 修改敏感词的方法
const xiugaiMingganci = (key)=>{

}
const updataSensitiveWordFun =async ()=>{
  await updataSensitiveWord('',{}).then((res)=>{
    if(res.code == "0"){
      
    }
  });
}
</script>

<style lang="less" scoped>
.sensitiveword {
  width: 100%;
  min-height: calc(100vh - 60px);
  padding: 30px 0;
  padding-bottom: 50px;
  background: linear-gradient(#fbfbfb 0%, #f5f5f5 100%);

  .sensitivewordBox {
    width: 85%;
    margin: 0 auto;
  }
}
.xiugai{
  margin-right: 30px;
}
</style>