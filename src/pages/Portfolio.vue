<template>
  <section id="portfolio" class="p-8 max-w-7xl mx-auto">
    <h2 class="text-xl sm:text-3xl font-semibold text-primary text-center mb-6">
      Karya Pilihan
    </h2>
    <div class="grid md:grid-cols-2 gap-6">
      <Card
        v-for="(portfolio, index) in portfolios"
        :key="index"
        :image="portfolio.image"
        :title="portfolio.title"
        :description="portfolio.description"
        :tech="portfolio.tech"
        :visitLink="portfolio.visit_link"
      />
    </div>
  </section>
</template>

<script setup>
import Card from "../components/Card.vue";
import portfolios from "../data/portfolios.json";
</script>
