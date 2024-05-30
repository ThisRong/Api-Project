<template>
  <div class="loding" v-if="store.isLoading == true ? true : false">
    <a-spin size="large" tip="Loading..." />
  </div>
</template>

<script setup>
import { useStore } from "@/store/index";
const store = useStore();
</script>

<style lang="less" scoped>
.loding {
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>