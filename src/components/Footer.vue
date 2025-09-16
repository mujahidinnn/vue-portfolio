<template>
  <footer
    class="mt-16 border-t border-gray-200 dark:border-gray-700 bg-background dark:bg-background-dark text-secondary dark:text-secondary-dark"
  >
    <div class="max-w-5xl mx-auto px-6 py-10 grid grid-cols-3 gap-8">
      <!-- Brand / About -->
      <div class="hidden sm:block">
        <h2 class="text-lg font-semibold text-primary dark:text-primary-dark">
          Mujahidin
        </h2>
        <p class="text-sm mt-2">
          Frontend Developer passionate about crafting clean & elegant digital
          experiences.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wide mb-3">
          Quick Links
        </h3>
        <!-- Mobile -->
        <ul v-if="isMobile" class="space-y-2 text-sm">
          <li><a href="#home" class="hover:text-accent">Home</a></li>
          <li><a href="#about" class="hover:text-accent">About</a></li>
          <li><a href="#portfolios" class="hover:text-accent">Portfolio</a></li>
          <li><a href="#projects" class="hover:text-accent">Projects</a></li>
          <li><a href="#contact" class="hover:text-accent">Contact</a></li>
        </ul>

        <!-- Desktop -->
        <ul v-else class="space-y-2 text-sm">
          <li>
            <RouterLink to="/" class="hover:text-accent">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/about" class="hover:text-accent">About</RouterLink>
          </li>
          <li>
            <RouterLink to="/portfolios" class="hover:text-accent"
              >Porfolio</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/projects" class="hover:text-accent"
              >Projects</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/contact" class="hover:text-accent"
              >Contact</RouterLink
            >
          </li>
        </ul>
      </div>

      <!-- Social -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wide mb-3">
          Connect
        </h3>
        <div class="flex flex-col gap-3">
          <a
            href="https://www.linkedin.com/in/mujahidin18"
            target="_blank"
            rel="noreferrer noopener"
            class="flex gap-1 items-center hover:text-accent"
          >
            <FontAwesomeIcon
              :icon="['fab', 'linkedin']"
              class="cursor-pointer hover:opacity-80 transition"
            />
            <p class="text-sm">LinkedIn</p>
          </a>
          <a
            href="https://github.com/mujahidinnn"
            target="_blank"
            rel="noreferrer noopener"
            class="flex gap-1 items-center hover:text-accent"
          >
            <FontAwesomeIcon
              :icon="['fab', 'github']"
              class="cursor-pointer hover:opacity-80 transition"
            />
            <p class="text-sm">Github</p>
          </a>
          <a
            href="mailto:mujahidin28394@gmail.com"
            class="flex gap-1 items-center hover:text-accent"
          >
            <FontAwesomeIcon
              :icon="['fas', 'envelope']"
              class="cursor-pointer hover:opacity-80 transition"
            />
            <p class="text-sm">Gmail</p>
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div
      class="text-center text-xs py-4 border-t border-gray-200 dark:border-gray-700"
    >
      © {{ new Date().getFullYear() }} All rights reserved by
      <span class="font-semibold">Mujahidin</span>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { inject } from "vue";
const isMobile = inject("isMobile");
</script>
