<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <section class="title-section">
    <h1>{{ title }}</h1>
    <p v-if="subtitle">{{ subtitle }}</p>
  </section>
</template>

<style lang="scss" scoped>
.title-section {
  display: flex;
  flex-direction: column;
  gap: toRem(5px);
}
</style>