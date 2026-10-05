<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
    aria-label="Primary mobile"
  >
    <ul class="grid grid-cols-5">
      <li v-for="item in navLinks" :key="item.to">
        <RouterLink
          :to="item.to"
          class="relative flex min-h-14 flex-col items-center justify-center gap-1 text-small text-secondary-2 before:absolute before:inset-x-4 before:top-0 before:h-0.5 before:scale-x-0 before:bg-accent before:transition-transform before:duration-200 aria-[current=page]:font-semibold aria-[current=page]:text-primary aria-[current=page]:before:scale-x-100"
        >
          <FontAwesomeIcon :icon="item.icon" class="text-base" />
          {{ item.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { navLinks } from "../site";
</script>
