<template>
  <section id="projects" class="wrap pt-8 lg:pt-20">
    <h1 class="display text-h1">Projects</h1>
    <p class="mt-5 max-w-[45rem]">
      Platforms I've built for clients and companies, from government systems
      to enterprise dashboards.
    </p>

    <div class="ruler mt-10" aria-hidden="true"></div>
    <div
      class="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
    >
      <Card
        v-for="project in visibleProjects"
        :key="project.title"
        v-bind="project"
      />
    </div>
  </section>
</template>

<script setup>
import Card from "../components/Card.vue";
import projects from "../data/projects.json";

const visibleProjects = [...projects]
  .reverse()
  .filter((project) => !project.hidden);
</script>
