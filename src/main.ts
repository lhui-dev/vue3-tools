import { createApp } from 'vue';
import App from './App.vue';

// 注册全局状态数据
import { setupStore } from './store';
// 注册路由信息
import { setupRouter } from './router';
// 自定义样式文件
import '@/assets/css/index.css';

const app = createApp(App);

app.use(setupStore);
app.use(setupRouter);

app.mount('#app');
