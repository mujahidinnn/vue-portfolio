<template>
  <section id="portfolios" class="wrap pt-8 lg:pt-20">
    <h1 class="display text-h1">Portfolio</h1>
    <p class="mt-5 max-w-[45rem]">
      Products and platforms I've designed and built end-to-end.
    </p>

    <div class="ruler mt-10" aria-hidden="true"></div>
    <div
      class="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
    >
      <Card
        v-for="portfolio in visiblePortfolios"
        :key="portfolio.title"
        v-bind="portfolio"
      />
    </div>
  </section>
</template>

<script setup>
import Card from "../components/Card.vue";
import portfolios from "../data/portfolios.json";

const visiblePortfolios = portfolios.filter((portfolio) => !portfolio.hidden);
</script>
