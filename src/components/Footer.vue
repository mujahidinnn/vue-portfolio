<template>
  <footer
    class="relative mt-24 border-t border-gray-200 dark:border-gray-700 bg-background dark:bg-background-dark text-secondary dark:text-secondary-dark overflow-hidden"
  >
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 dark:via-accent-dark/60 to-transparent"
    ></div>

    <div class="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-3 gap-8">
      <!-- Brand / About -->
      <div class="col-span-2 sm:col-span-1">
        <h2 class="text-lg font-bold text-primary dark:text-primary-dark">
          Mujahidin
        </h2>
        <p class="text-sm mt-2 max-w-xs">
          Frontend Developer passionate about crafting clean & elegant digital
          experiences.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-xs sm:text-sm font-bold uppercase tracking-wide mb-3">
          Quick Links
        </h3>

        <ul class="grid grid-cols-1 gap-x-4 gap-y-2 text-xs sm:text-sm">
          <li>
            <a
              href="#home"
              @click.prevent="scrollToSection('/#home')"
              class="inline-block hover:text-accent dark:hover:text-accent-dark hover:translate-x-0.5 transition-transform"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#work-experience"
              @click.prevent="scrollToSection('/#work-experience')"
              class="inline-block hover:text-accent dark:hover:text-accent-dark hover:translate-x-0.5 transition-transform whitespace-nowrap"
              aria-label="Go to Work Experience"
              >Work Experience</a
            >
          </li>
          <li>
            <a
              href="#education"
              @click.prevent="scrollToSection('/#education')"
              class="inline-block hover:text-accent dark:hover:text-accent-dark hover:translate-x-0.5 transition-transform"
              aria-label="Go to Education"
              >Education</a
            >
          </li>
          <li>
            <a
              href="#about"
              @click.prevent="scrollToSection('/about#about')"
              class="inline-block hover:text-accent dark:hover:text-accent-dark hover:translate-x-0.5 transition-transform"
              aria-label="Go to About"
              >About</a
            >
          </li>
          <li>
            <a
              href="#uses"
              @click.prevent="scrollToSection('/about#uses')"
              class="inline-block hover:text-accent dark:hover:text-accent-dark hover:translate-x-0.5 transition-transform"
              aria-label="Go to Uses and Tools"
              >Uses & Tools</a
            >
          </li>
          <li>
            <a
              href="#portfolios"
              @click.prevent="scrollToSection('/portfolios#portfolios')"
              class="inline-block hover:text-accent dark:hover:text-accent-dark hover:translate-x-0.5 transition-transform"
              aria-label="Go to Portfolio"
              >Portfolio</a
            >
          </li>
          <li>
            <a
              href="#projects"
              @click.prevent="scrollToSection('/projects#projects')"
              class="inline-block hover:text-accent dark:hover:text-accent-dark hover:translate-x-0.5 transition-transform"
              aria-label="Go to Projects"
              >Projects</a
            >
          </li>
          <li>
            <a
              href="#contact"
              @click.prevent="scrollToSection('/contact#contact')"
              class="inline-block hover:text-accent dark:hover:text-accent-dark hover:translate-x-0.5 transition-transform"
              aria-label="Go to Contact"
              >Contact</a
            >
          </li>
        </ul>
      </div>

      <!-- Social -->
      <div>
        <h3 class="text-xs sm:text-sm font-bold uppercase tracking-wide mb-3">
          Connect
        </h3>
        <div class="grid gap-2 text-xs sm:text-sm justify-items-stretch">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            :target="social.external ? '_blank' : undefined"
            :rel="social.external ? 'noreferrer noopener' : undefined"
            class="group flex gap-2 items-center px-2.5 py-1.5 -mx-2.5 rounded-full hover:bg-accent/10 dark:hover:bg-accent-dark/15 transition-colors"
            :aria-label="social.aria"
          >
            <span
              class="w-6 h-6 flex items-center justify-center rounded-full bg-accent/10 text-accent dark:bg-accent-dark/15 dark:text-accent-dark group-hover:bg-accent group-hover:text-white dark:group-hover:bg-accent-dark transition-colors"
            >
              <FontAwesomeIcon :icon="social.icon" class="text-[10px]" />
            </span>
            <span
              class="group-hover:text-accent dark:group-hover:text-accent-dark transition-colors"
              >{{ social.label }}</span
            >
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

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mujahidin18",
    icon: ["fab", "linkedin"],
    external: true,
    aria: "Visit my LinkedIn profile",
  },
  {
    label: "Github",
    href: "https://github.com/mujahidinnn",
    icon: ["fab", "github"],
    external: true,
    aria: "Visit my GitHub profile",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mujahidin1802",
    icon: ["fab", "instagram"],
    external: true,
    aria: "Visit my Instagram profile",
  },
  {
    label: "Discord",
    href: "https://discord.com/users/1077911957719502938",
    icon: ["fab", "discord"],
    external: true,
    aria: "Visit my Discord profile",
  },
  {
    label: "Gmail",
    href: "mailto:mujahidin28394@gmail.com",
    icon: ["fas", "envelope"],
    external: false,
    aria: "Send me an email",
  },
];

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
