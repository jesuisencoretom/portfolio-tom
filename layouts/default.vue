<template>
  <div class="layout-container">
    <slot />
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.layout-container {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: toRem(30) toRem(36);
  padding-top: toRem(20);
}
</style>