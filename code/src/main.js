import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import * as Icons from '@ant-design/icons-vue';
import { createPinia } from 'pinia'
const pinia = createPinia()
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //引入持久化插件
pinia.use(piniaPluginPersistedstate);


// 引入全局样式
import '@/assets/less/global.less'
import router from './router'


// 引入 highlight.js 代码高亮工具
import hljs from "highlight.js";
// 使用样式，有多种样式可选
import 'highlight.js/styles/googlecode.css'


const app = createApp(App);

app.use(pinia).use(router).use(Antd).mount('#app')

const icons = Icons;
for(const i in icons){
  app.component(i,icons[i]);
}

// 增加自定义命令v-highlight
app.directive("highlight", function(el) {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach(block => {
    hljs.highlightBlock(block);
  });
});


