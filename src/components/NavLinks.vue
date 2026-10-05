<template>
  <li v-for="link in navLinks" :key="link.to">
    <RouterLink
      :to="link.to"
      class="relative inline-flex min-h-11 items-center px-3.5 text-[0.9375rem] text-secondary after:absolute after:inset-x-3.5 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:text-primary hover:after:scale-x-100 aria-[current=page]:font-medium aria-[current=page]:text-primary aria-[current=page]:after:scale-x-100"
    >
      {{ link.label }}
    </RouterLink>
  </li>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { navLinks } from "../site";
</script>
