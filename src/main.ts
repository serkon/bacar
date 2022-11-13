import 'bootstrap/dist/css/bootstrap.css';
import './assets/main.scss';
import '@fontsource/roboto';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// Auto Register Components Globally
const modules = import.meta.glob('./components/*/*.vue', { eager: true });
console.log(modules);
Object.keys(modules).forEach((filePath) => {
  const component = (modules[filePath] as any).default || modules[filePath];
  const name = component.name || filePath.replace(/^.+\//, '').replace(/\.\w+$/, '');
  app.component(name, component);
});

// Global Error Handler
// app.config.errorHandler = function (err: any, vm, info) {
//   // handle error
//   // `info` is a Vue-specific error info, e.g. which lifecycle hook
//   // the error was found in. Only available in 2.2.0+
//   console.warn(`Error occurred: ${err.toString()}\nInfo: ${info}`);
// };
app.use(createPinia());
app.use(router);

app.mount('#app');
import 'bootstrap/dist/js/bootstrap.js';
