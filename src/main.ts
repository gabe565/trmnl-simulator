import App from "./App.vue";
import "./style.css";
import { createPinia } from "pinia";
import piniaPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersistedstate);

app.use(pinia);
app.mount("#app");
