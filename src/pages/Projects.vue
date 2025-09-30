<template>
  <section id="projects" class="py-8 container mx-auto max-w-7xl">
    <div class="relative flex items-center justify-center mb-6">
      <h2
        class="text-xl sm:text-3xl font-semibold text-primary dark:text-primary-dark text-center"
      >
        Projects
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
          v-for="project in projects"
          :key="project.id"
          :image="project.image"
          :title="project.title"
          :description="project.description"
          :tech="project.tech"
          :links="project.links"
        />
      </template>
    </div>
  </section>
</template>

<script setup>
import { inject, ref, onMounted, computed } from "vue";
import Card from "../components/Card.vue";
import CardLoading from "../components/CardLoading.vue";

defineProps({
  isFeatured: Boolean,
});

const isMobile = inject("isMobile");

const projects = ref([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const res = await fetch("/data/projects.json");
  projects.value = await res.json();
  loading.value = false;
});
</script>
