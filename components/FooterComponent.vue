<script setup lang="ts">
defineProps<{
  leftLink: {
    label: string;
    link: string;
    noUnderline?: boolean;
  };
  rightLink?: {
    label: string;
    link: string;
    noUnderline?: boolean;
  };
}>();
</script>

<template>
  <section class="footer">
    <NuxtLink v-if="leftLink" :to="leftLink.link" :class="{ 'no-underline': leftLink.noUnderline }" :title="'page ' + leftLink.label">{{
      leftLink.label }}
    </NuxtLink>
    <NuxtLink v-if="rightLink" :to="rightLink.link" :class="{ 'no-underline': rightLink.noUnderline }"
      :title="'page ' + rightLink.label">{{ rightLink.label }}
    </NuxtLink>
  </section>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 1.5px;
    text-transform: lowercase;

    &.no-underline {
      text-decoration: none;
    }
  }
}
</style>
