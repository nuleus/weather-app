import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { vue3Debounce } from "vue-debounce";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.directive("debounce", vue3Debounce({ lock: true }));
app.mount("#app");
