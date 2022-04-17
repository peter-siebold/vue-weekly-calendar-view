<template>
  <div>
    <h1>Error....{{ message }}</h1>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    message: string;
  }>(),
  {
    message: "",
  }
);
</script>
