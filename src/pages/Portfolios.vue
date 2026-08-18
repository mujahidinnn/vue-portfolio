<template>
  <section id="portfolios" class="py-12 sm:py-16 container mx-auto max-w-7xl">
    <div class="mb-8 sm:mb-10 max-w-2xl">
      <h1
        class="text-2xl sm:text-4xl font-bold text-primary dark:text-primary-dark mb-2"
      >
        Portfolio
      </h1>
      <p class="text-secondary dark:text-secondary-dark text-sm sm:text-base">
        Products and platforms I've designed and built end-to-end.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      <Card
        v-for="portfolio in visiblePortfolios"
        :key="portfolio.id"
        :thumbnail="portfolio.thumbnail"
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
import { inject, computed } from "vue";
import Card from "../components/Card.vue";
import portfolios from "../data/portfolios.json";

const isMobile = inject("isMobile");
const visiblePortfolios = computed(() =>
  portfolios.filter((portfolio) => !portfolio.hidden)
);
</script>
