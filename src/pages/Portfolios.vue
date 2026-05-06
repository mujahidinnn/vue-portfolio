<template>
  <section id="portfolios" class="py-8 container mx-auto max-w-7xl">
    <div class="relative flex items-center justify-center mb-6">
      <h2
        class="text-xl sm:text-3xl font-semibold text-primary dark:text-primary-dark text-center"
      >
        Portfolio
      </h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Card
        v-for="portfolio in portfolios"
        :key="portfolio.id"
        :image="portfolio.image"
        :images="portfolio.images"
        :title="portfolio.title"
        :description="portfolio.description"
        :tech="portfolio.tech"
        :links="portfolio.links"
        :story="portfolio.story"
      />
    </div>
  </section>
</template>

<script setup>
import { inject } from "vue";
import Card from "../components/Card.vue";
import portfolios from "../data/portfolios.json";

const isMobile = inject("isMobile");
</script>
