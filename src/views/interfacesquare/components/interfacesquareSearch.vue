<template>
  <div class="interfacesquareSearch" style="display:none;">
    <a-space direction="vertical" class="interfacesquareSearch_space">
      <a-input-search
        v-model:value="value"
        placeholder="没有找到心仪的接口？快搜索一下吧"
        enter-button="搜索"
        size="large"
        @search="onSearch"
      />
    </a-space>
  </div>
</template>

<script setup>
import { ref } from "vue";
const value = ref("");
const onSearch = (searchValue) => {
  console.log("use value", searchValue);
  console.log("or use this.value", value.value);
};
</script>

<style scoped lang="less">
.interfacesquareSearch {
  width: 85%;
  height: 150px;
  margin: 0 auto;
  margin-bottom: 40px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;

  .interfacesquareSearch_space {
    width: 40%;
  }
}
</style>