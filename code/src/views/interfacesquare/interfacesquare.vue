<template>
  <div class="interfacesquare">
    <interfacesquareSearchVue />
    <interfacesquareDomVue />
  </div>
</template>

<script setup>
import interfacesquareDomVue from "./components/interfacesquareDom.vue";
import interfacesquareSearchVue from "./components/interfacesquareSearch.vue";
</script>

<style lang="less" scoped>
.interfacesquare {
  width: 100%;
  height: 100%;
  padding-top: 40px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>