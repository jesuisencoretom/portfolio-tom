<template>
  <div class="layout-container">
    <Transition name="page-loader" appear>
      <div v-if="!isLoaded" class="fade-in">

      </div>
    </Transition>
    <Transition name="page-content" appear>
      <div v-if="isLoaded" class="content-wrapper">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const isLoaded = ref(false);

onMounted(() => {
  // Petit délai pour voir la transition
  setTimeout(() => {
    isLoaded.value = true;
  }, 400);
});

</script>

<style lang="scss" scoped>
.fade-in {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background-color: $background-color;
  z-index: 1000;
}

.content-wrapper {
  height: 100%;
  width: 100%;
}

.layout-container {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: toRem(30) toRem(36);
  padding-top: toRem(20);
  position: relative;
}

// Transitions pour le loader
.page-loader-enter-active,
.page-loader-leave-active {
  transition: opacity 200ms ease-in-out;
}

.page-loader-enter-from,
.page-loader-leave-to {
  opacity: 0;
}

// Transitions pour le contenu
.page-content-enter-active {
  transition: opacity 400ms ease-out;
  transition-delay: 100ms;
}

.page-content-enter-from {
  opacity: 0;
}

.page-content-enter-to {
  opacity: 1;
}
</style>