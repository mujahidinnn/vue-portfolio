<template>
  <section id="projects" class="py-12 sm:py-16 container mx-auto max-w-7xl">
    <div class="mb-8 sm:mb-10 max-w-2xl">
      <h1
        class="text-2xl sm:text-4xl font-bold text-primary dark:text-primary-dark mb-2"
      >
        Projects
      </h1>
      <p class="text-secondary dark:text-secondary-dark text-sm sm:text-base">
        A selection of things I've built — from client work to personal
        experiments.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      <Card
        v-for="project in [...projects].reverse()"
        :key="project.id"
        :thumbnail="project.thumbnail"
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
