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
      <Card
        v-for="project in projects"
        :key="project.id"
        :image="project.image"
        :title="project.title"
        :description="project.description"
        :tech="project.tech"
        :links="project.links"
      />
    </div>
  </section>
</template>

<script setup>
import { inject } from "vue";
import Card from "../components/Card.vue";
import projects from "../data/projects.json";

const isMobile = inject("isMobile");
</script>
