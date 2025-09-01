<script setup lang="ts">
import DefaultPageList from '~/components/DefaultPageList.vue';
import Title from '~/components/Title.vue';
import TempBackground from '~/components/TempBackground.vue';
import indexContent from '~/content/pages/index.json';
import type { PageData } from '~/@types/pageContent';

const content = indexContent as PageData
</script>

<template>
  <main class="index-container" ref="containerRef">
    <!-- <SquareShape /> -->
    <TempBackground :shapes="content.shapes" />
    <Title :title="content.title" :subtitle="content.subtitle" />
    <DefaultPageList v-if="content.items" :items="content.items" />
    <FooterComponent v-if="content.footerLinks?.leftLink" :leftLink="content.footerLinks.leftLink"
      :rightLink="content.footerLinks.rightLink" />
  </main>
</template>

<style lang="scss" scoped>
.index-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
