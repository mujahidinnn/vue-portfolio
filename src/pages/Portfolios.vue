<template>
  <section id="portfolios" class="py-8 container mx-auto max-w-7xl">
    <div class="relative flex items-center justify-center mb-6">
      <RouterLink
        v-if="
          !isFeatured &&
          isMobile &&
          portfolios.length > featuredPortfolios.length
        "
        to="/"
        class="absolute left-0 flex items-center justify-center w-10 h-10 rounded-full hover:bg-background-2 dark:bg-background-2-dark text-primary dark:text-primary-dark shadow-sm transition-colors duration-200"
      >
        <FontAwesomeIcon :icon="['fas', 'chevron-left']" class="text-sm" />
      </RouterLink>

      <h2
        class="text-xl sm:text-3xl font-semibold text-primary dark:text-primary-dark text-center"
      >
        Portfolio
      </h2>
    </div>

    <!-- Featured portfolios -->
    <div v-if="isFeatured && portfolios.length > featuredPortfolios.length">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card
          v-for="portfolio in featuredPortfolios"
          :key="portfolio.id"
          :image="portfolio.image"
          :title="portfolio.title"
          :description="portfolio.description"
          :tech="portfolio.tech"
          :links="portfolio.links"
        />
      </div>

      <div class="flex justify-center mt-6">
        <RouterLink
          to="/portfolios"
          class="inline-flex items-center px-6 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors duration-200"
        >
          View More
        </RouterLink>
      </div>
    </div>

    <!-- All portfolios -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Card
        v-for="portfolio in portfolios"
        :key="portfolio.id"
        :image="portfolio.image"
        :title="portfolio.title"
        :description="portfolio.description"
        :tech="portfolio.tech"
        :links="portfolio.links"
      />
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import Card from "../components/Card.vue";
import portfolios from "../data/portfolios.json";
import { inject } from "vue";

defineProps({
  isFeatured: Boolean,
});

const isMobile = inject("isMobile");

const featuredPortfolios = portfolios.filter((p) => p.is_featured);
</script>
