<template>
  <section id="projects" class="p-8 max-w-7xl mx-auto">
    <h2 class="text-xl sm:text-3xl font-semibold text-primary text-center mb-6">
      Proyek Pilihan
    </h2>

    <!-- Desktop -->
    <div class="grid xl:grid-cols-2 gap-6 hidden md:grid">
      <Card
        v-for="(project, index) in projects"
        :key="index"
        :image="project.image"
        :title="project.title"
        :description="project.description"
        :tech="project.tech"
        :visitLink="project.visit_link"
      />
    </div>

    <!-- Mobile -->
    <div class="flex flex-col gap-4 md:hidden">
      <Card
        v-for="(project, index) in visibleProjects"
        :key="index"
        :image="project.image"
        :title="project.title"
        :description="project.description"
        :tech="project.tech"
        :visitLink="project.visit_link"
      />

      <!-- Show More / Less Button -->
      <div v-if="projects.length > 4" class="text-center mt-4">
        <button
          @click="toggleShowAll"
          class="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg shadow hover:bg-accent transition"
        >
          {{ showAll ? "Tampil lebih sedikit" : "Tampil lebih banyak" }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import Card from "../components/Card.vue";
import projects from "../data/projects.json";

const showAll = ref(false);

const visibleProjects = computed(() => {
  return showAll.value ? projects : projects.slice(0, 4);
});

function toggleShowAll() {
  showAll.value = !showAll.value;
}
</script>
