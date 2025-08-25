<template>
  <div class="flex flex-col gap-15">
    <Home id="home" />
    <About id="about" />
    <Portfolio id="portfolio" />
    <Projects id="projects" />
    <Contact id="contact" />
  </div>
</template>

<script setup>
import About from "../pages/About.vue";
import Contact from "../pages/Contact.vue";
import Home from "../pages/Home.vue";
import Portfolio from "../pages/Portfolio.vue";
import Projects from "../pages/Projects.vue";
</script>
