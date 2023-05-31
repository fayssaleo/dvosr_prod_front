import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/scss/main.scss";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import VCalendar from "v-calendar";
import VueTheMask from "vue-the-mask";
import JsonExcel from "vue-json-excel";
import ToggleButton from "vue-js-toggle-button";

Vue.config.productionTip = false;
Vue.use(VCalendar, {
  componentPrefix: "vc",
});
Vue.use(VueTheMask);
Vue.component("downloadExcel", JsonExcel);
Vue.use(ToggleButton);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
