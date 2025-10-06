<template>
  <footer
    class="mt-16 border-t border-gray-200 dark:border-gray-700 bg-background dark:bg-background-dark text-secondary dark:text-secondary-dark"
  >
    <div class="max-w-5xl mx-auto px-6 py-10 grid grid-cols-3 gap-8">
      <!-- Brand / About -->
      <div class="hidden sm:block">
        <h2 class="text-lg font-bold text-primary dark:text-primary-dark">
          Mujahidin
        </h2>
        <p class="text-sm mt-2">
          Frontend Developer passionate about crafting clean & elegant digital
          experiences.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-sm font-bold uppercase tracking-wide mb-3">
          Quick Links
        </h3>

        <ul class="space-y-2 text-sm">
          <li>
            <a
              href="#home"
              @click.prevent="scrollToSection('/#home')"
              class="hover:text-accent"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#work-experience"
              @click.prevent="scrollToSection('/#work-experience')"
              class="hover:text-accent whitespace-nowrap"
              >Work Experience</a
            >
          </li>
          <li>
            <a
              href="#education"
              @click.prevent="scrollToSection('/#education')"
              class="hover:text-accent"
              >Education</a
            >
          </li>
          <li>
            <a
              href="#about"
              @click.prevent="scrollToSection('/about#about')"
              class="hover:text-accent"
              >About</a
            >
          </li>
          <li>
            <a
              href="#uses"
              @click.prevent="scrollToSection('/about#uses')"
              class="hover:text-accent"
              >Uses & Tools</a
            >
          </li>
          <li>
            <a
              href="#portfolios"
              @click.prevent="scrollToSection('/portfolios#portfolios')"
              class="hover:text-accent"
              >Portfolio</a
            >
          </li>
          <li>
            <a
              href="#projects"
              @click.prevent="scrollToSection('/projects#projects')"
              class="hover:text-accent"
              >Projects</a
            >
          </li>
          <li>
            <a
              href="#contact"
              @click.prevent="scrollToSection('/contact#contact')"
              class="hover:text-accent"
              >Contact</a
            >
          </li>
        </ul>
      </div>

      <!-- Social -->
      <div>
        <h3 class="text-sm font-bold uppercase tracking-wide mb-3">Connect</h3>
        <div class="flex flex-col gap-3">
          <a
            href="https://www.linkedin.com/in/mujahidin18"
            target="_blank"
            rel="noreferrer noopener"
            class="flex gap-1 items-center hover:text-accent"
          >
            <FontAwesomeIcon :icon="['fab', 'linkedin']" />
            <p class="text-sm">LinkedIn</p>
          </a>
          <a
            href="https://github.com/mujahidinnn"
            target="_blank"
            rel="noreferrer noopener"
            class="flex gap-1 items-center hover:text-accent"
          >
            <FontAwesomeIcon :icon="['fab', 'github']" />
            <p class="text-sm">Github</p>
          </a>
          <a
            href="mailto:mujahidin28394@gmail.com"
            class="flex gap-1 items-center hover:text-accent"
          >
            <FontAwesomeIcon :icon="['fas', 'envelope']" />
            <p class="text-sm">Gmail</p>
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div
      class="text-center text-xs py-4 border-t border-gray-200 dark:border-gray-700 min-h-30 sm:min-h-0"
    >
      © {{ new Date().getFullYear() }} All rights reserved by
      <span class="font-semibold">Mujahidin</span>
    </div>
  </footer>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - 80; // offset
  window.scrollTo({ top, behavior: "smooth" });
}

async function scrollToSection(path) {
  const [basePath, hash] = path.split("#");

  if (route.path === basePath) {
    if (hash) {
      setTimeout(() => smoothScrollTo(hash), 100);
    } else {
      smoothScrollTo("home");
    }
  } else {
    await router.push(basePath);

    if (hash) {
      setTimeout(() => smoothScrollTo(hash), 400);
    }
  }
}
</script>
