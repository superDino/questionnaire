import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import router from './router'; 
import 'element-plus/dist/index.css';
import './assets/styles/css/global.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import api from '@/api';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus);
app.use(router); // 使用路由
app.use(api); // 使用api
app.mount('#app');

