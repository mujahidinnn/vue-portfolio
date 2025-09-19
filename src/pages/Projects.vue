<template>
  <section id="projects" class="py-8 container mx-auto max-w-7xl">
    <div class="relative flex items-center justify-center mb-6">
      <RouterLink
        v-if="
          !isFeatured && isMobile && projects.length > featuredProjects.length
        "
        to="/"
        class="absolute left-0 flex items-center justify-center w-10 h-10 rounded-full hover:bg-background-2 dark:bg-background-2-dark text-primary dark:text-primary-dark shadow-sm transition-colors duration-200"
      >
        <FontAwesomeIcon :icon="['fas', 'chevron-left']" class="text-sm" />
      </RouterLink>

      <h2
        class="text-xl sm:text-3xl font-semibold text-primary dark:text-primary-dark text-center"
      >
        Projects
      </h2>
    </div>

    <!-- Featured projects -->
    <div v-if="isFeatured && projects.length > featuredProjects.length">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!-- Skeleton -->
        <template v-if="loading">
          <CardLoading v-for="n in 4" :key="n" />
        </template>

        <!-- Real data -->
        <template v-else>
          <Card
            v-for="project in featuredProjects"
            :key="project.id"
            :image="project.image"
            :title="project.title"
            :description="project.description"
            :tech="project.tech"
            :links="project.links"
          />
        </template>
      </div>

      <div v-if="!loading" class="flex justify-center mt-6">
        <RouterLink
          to="/projects"
          class="inline-flex items-center text-sm px-6 py-2 bg-accent hover:bg-accent/80 text-white rounded-2xl transition-colors duration-200"
        >
          View More
          <FontAwesomeIcon :icon="['fas', 'angles-right']" class="text-sm" />
        </RouterLink>
      </div>
    </div>

    <!-- All projects -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
import { RouterLink } from "vue-router";
import { inject, ref, onMounted, computed } from "vue";
import Card from "../components/Card.vue";
import CardLoading from "../components/CardLoading.vue";

defineProps({
  isFeatured: Boolean,
});

const isMobile = inject("isMobile");

const projects = ref([]);
const loading = ref(false);

const featuredProjects = computed(() =>
  projects.value.filter((p) => p.is_featured)
);

onMounted(async () => {
  loading.value = true;
  const res = await fetch("/data/projects.json");
  projects.value = await res.json();
  loading.value = false;
});
</script>
