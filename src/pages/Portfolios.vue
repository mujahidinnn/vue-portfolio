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
      <!-- Skeleton -->
      <template v-if="loading">
        <CardLoading v-for="n in 6" :key="n" />
      </template>

      <!-- Real data -->
      <template v-else>
        <Card
          v-for="portfolio in portfolios"
          :key="portfolio.id"
          :image="portfolio.image"
          :title="portfolio.title"
          :description="portfolio.description"
          :tech="portfolio.tech"
          :links="portfolio.links"
          :story="portfolio.story"
        />
      </template>
    </div>
  </section>
</template>

<script setup>
import Card from "../components/Card.vue";
import CardLoading from "../components/CardLoading.vue";
import { inject, ref, onMounted, computed } from "vue";

const isMobile = inject("isMobile");

const portfolios = ref([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const res = await fetch("/data/portfolios.json");
  portfolios.value = await res.json();
  loading.value = false;
});
</script>
