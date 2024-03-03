import { createApp } from 'vue'
import './style.css';
import router from './router';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App)
library.add(fas)

async function enableMocking() {
  if (process.env.NODE_ENV != 'development') {
    return;
  }
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

enableMocking().then(() => {
  app.use(router).component('fa', FontAwesomeIcon).mount('#app')
});
