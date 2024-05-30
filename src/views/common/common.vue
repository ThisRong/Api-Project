<template>
  <div class="common">
    <!-- 头部的 -->
    <div class="common_header" v-if="headerFlag">
      <navVue />
    </div>

    <!-- 主体部分 -->
    <div class="common_main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <!-- <lodingVue/> -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, watch } from "vue";
import navVue from "../nav/nav.vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store/index";
import lodingVue from "@/components/loding/loding.vue";
const router = useRouter();
let headerFlag = ref(false);
watch(
  router.currentRoute,
  (newValue, oldValue) => {
    if (newValue.path == "/login" || newValue.path == "/register") {
      headerFlag.value = false;
    } else {
      headerFlag.value = true;
    }
    // headerFlag.value = newValue;
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style scoped lang="less" src='@/assets/less/common.less'></style>
<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  // transform: scale(0.9);
}
</style>