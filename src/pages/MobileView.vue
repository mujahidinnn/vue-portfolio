<template>
  <div class="flex flex-col gap-15">
    <Home id="home" />
    <About id="about" />
    <Portfolios id="portfolios" :isFeatured="true" />
    <Projects id="projects" :isFeatured="true" />
    <Contact id="contact" />
  </div>
</template>

<script setup>
import About from "./About.vue";
import Contact from "./Contact.vue";
import Home from "./Home.vue";
import Portfolios from "./Portfolios.vue";
import Projects from "./Projects.vue";
</script>
