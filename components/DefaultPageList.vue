<template>
  <section class="default-page-list">
    <ul class="link-list">
      <li v-for="item in items" :key="item.label" class="link-list__item">
        <p>
          <NuxtLink :to="item.link" target="_blank" :class="{ 'no-underline': item.noUnderline }"
            :title="'lien externe, ' + item.label">{{ item.label }}
          </NuxtLink>
          <span v-if="item.description"> -</span>
          {{ item.description }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script setup>
defineProps({
  items: Array
})
</script>

<style lang="scss" scoped>
.default-page-list {
  padding: toRem(24) 0;

  .link-list {
    list-style: none;
    padding: 0;
    margin: 0;
    text-transform: lowercase;

    &__item {
      margin-bottom: toRem(8px);

      a {
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 1.5px;

        &.no-underline {
          text-decoration: none;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>