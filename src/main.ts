import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import store from "./store";
import moment from "moment";
const app = createApp(App);
app.use(store);
app.mount("#app"); // mount the app to the DOM

moment.updateLocale('en', {
    week: {
      dow : 1, // Monday is the first day of the week.
    }
  });