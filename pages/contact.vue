<script setup lang="ts">
import contactContent from '~/content/pages/contact.json';
import Title from '~/components/Title.vue';
import DefaultPageList from '~/components/DefaultPageList.vue';
import type { PageData } from '~/@types/pageContent';
import FooterComponent from '~/components/FooterComponent.vue';

const content = contactContent as PageData;

useHead({
  title: 'Contact - Tom Wainberg',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
});
</script>

<template>
  <main class="basic-container" ref="mainRef">
    <Title :title="content.title" />
    <DefaultPageList v-if="content.items" :items="content.items" />
    <FooterComponent v-if="content.footerLinks?.leftLink" :leftLink="content.footerLinks.leftLink"
      :rightLink="content.footerLinks.rightLink" />
  </main>
</template>

<style lang="scss">
.basic-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content-container {
    .legal-section {
      margin-bottom: toRem(24);

      h2 {
        font-size: toRem(18);
        margin-bottom: toRem(6);
        font-weight: bold;
        text-transform: lowercase;
      }

      p {
        line-height: 1.2;

        a {
          color: inherit;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 1.5px;
        }

        em {
          font-style: italic;
          opacity: 0.8;
        }
      }
    }
  }
}
</style>