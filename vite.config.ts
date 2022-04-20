import { defineConfig, loadEnv } from 'vite'
import vue from "@vitejs/plugin-vue";

export default defineConfig(({command, mode}) => ({
  base:  mode === "production" ? "/vue-weekly-calendar-view" : "/",
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/variables";`,
      },
    },
  },
}));
