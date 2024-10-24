import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import router from './router'; 
import 'element-plus/dist/index.css';
import './assets/styles/css/global.css';
const app = createApp(App);
app.use(ElementPlus);
app.use(router); // 使用路由
app.mount('#app');
