<script setup lang="ts">
import mentionsLegalesContent from '~/content/pages/mentions-legales.json';
import Title from '~/components/Title.vue';

import type { PageData } from '~/@types/pageContent';
import FooterComponent from '~/components/FooterComponent.vue';

const content = mentionsLegalesContent as PageData;

useHead({
  title: 'Mentions légales - Tom Wainberg',
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

    <div class="content-container">
      <section class="legal-section">
        <h2>éditeur</h2>
        <p>tom wainberg</p>
        <p>mail : <a href="mailto:tom.wainberg@gmail.com">tom.wainberg@gmail.com</a></p>
      </section>

      <section class="legal-section">
        <h2>hébergeur</h2>
        <p>netlify, inc.</p>
        <p>44 montgomery street, suite 300, san srancisco, ca 94104</p>
      </section>

      <section class="legal-section">
        <p class="last-updated">dernière mise à jour : août 2025</p>
      </section>
    </div>

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

      .last-updated {
        text-transform: lowercase;
      }
    }
  }
}
</style>