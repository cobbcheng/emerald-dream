import { createRouter, createWebHashHistory } from 'vue-router';
import PrivacyPolicy from './pages/PrivacyPolicy.vue';
import Ship from './pages/Ship.vue';
import UserAgreement from './pages/UserAgreement.vue';

const routes = [
  { path: '/pp', component: PrivacyPolicy },
  { path: '/ship', component: Ship },
  { path: '/ua', component: UserAgreement },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
