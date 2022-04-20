<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script setup lang="ts">
import TheHeader from "./components/Header/Header.vue";
</script>

<style lang="scss">
html {
  font-family: sans-serif;
  font-size: 16px;
  color: $text-color;
  background-color: $background-color;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
