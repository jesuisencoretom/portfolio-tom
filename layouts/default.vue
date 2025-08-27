<template>
  <div class="layout-container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: toRem(30) toRem(36);
  padding-top: toRem(20);
}
</style>