<template>
  <!-- pb di mobile: ruang untuk NavbarBottom agar konten terakhir tidak tertutup -->
  <footer
    class="mt-section border-t border-primary bg-background pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0"
  >
    <!-- Ajakan kontak (semua halaman kecuali Contact) -->
    <div
      v-if="showCta"
      class="wrap flex flex-col items-start gap-6 py-16 lg:flex-row lg:items-end lg:justify-between lg:py-24"
    >
      <h2 class="display max-w-[18ch] text-h1">
        Have a project in mind? Let's talk.
      </h2>
      <RouterLink to="/contact" class="btn btn-primary">Get in touch</RouterLink>
    </div>

    <!-- Pemisah antara ajakan kontak dan isi footer; tanpa ajakan (Contact) garis atas footer sudah cukup -->
    <div v-if="showCta" class="wrap">
      <div class="ruler" aria-hidden="true"></div>
    </div>

    <div class="wrap grid gap-10 py-12 md:grid-cols-[1.2fr_1.2fr_1fr]">
      <div>
        <p class="display text-3xl">Mujahidin</p>
        <p class="mt-3 max-w-xs text-base">
          Frontend web developer based in Jakarta, Indonesia.
        </p>
      </div>

      <!-- Indeks situs: sel berukuran tak seragam (fr berbeda per baris), tiap sel punya ciri sendiri.
           Halaman aktif ditandai latar + garis tepi tipis berwarna aksen. -->
      <nav aria-labelledby="site-index">
        <p id="site-index" class="note mb-3">Site index</p>
        <div class="plate">
          <div class="grid grid-cols-[1.6fr_1fr_1.2fr] border-b border-border">
            <!-- Home: cincin kontur + panah utara (titik awal peta) -->
            <RouterLink to="/" :class="[CELL, LINK, 'border-r border-border']">
              <span aria-hidden="true" class="rings absolute inset-0"></span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                class="absolute top-3 right-3 size-7"
              >
                <path d="M12 2 18 21 12 16.5Z" class="fill-primary" />
                <path
                  d="M12 2 6 21 12 16.5Z"
                  class="fill-background stroke-primary"
                  stroke-width="1"
                  stroke-linejoin="round"
                />
              </svg>
              <span class="relative">Home</span>
            </RouterLink>
            <!-- About: potret kecil -->
            <RouterLink to="/about" :class="[CELL, LINK, 'border-r border-border']">
              <img
                src="/me.webp"
                alt=""
                width="36"
                height="36"
                loading="lazy"
                class="absolute top-3 right-3 size-9 border border-primary object-cover grayscale group-hover:grayscale-0 group-aria-[current=page]:grayscale-0"
              />
              About
            </RouterLink>
            <!-- Portfolio: satu petak per karya pribadi + jumlahnya -->
            <RouterLink to="/portfolios" :class="[CELL, LINK]">
              <span
                aria-hidden="true"
                class="absolute top-3.5 left-3 grid grid-cols-3 gap-1"
              >
                <span
                  v-for="n in portfolioCount"
                  :key="n"
                  class="size-2 border border-primary group-hover:bg-accent group-aria-[current=page]:bg-accent"
                ></span>
              </span>
              <span aria-hidden="true" :class="COUNT">{{ portfolioCount }}</span>
              Portfolio
            </RouterLink>
          </div>
          <div class="grid grid-cols-[1.2fr_1.25fr_1.15fr] sm:grid-cols-[1.2fr_1.6fr_1fr]">
            <!-- Projects: penggaris, satu tik per project klien + jumlahnya -->
            <RouterLink to="/projects" :class="[CELL, LINK, 'border-r border-border']">
              <span
                aria-hidden="true"
                class="absolute inset-x-3 top-0 flex justify-between"
              >
                <span
                  v-for="n in projectCount"
                  :key="n"
                  class="w-px bg-primary"
                  :class="n % 5 === 1 ? 'h-3' : 'h-1.5'"
                ></span>
              </span>
              <span aria-hidden="true" :class="[COUNT, 'top-4']">{{ projectCount }}</span>
              Projects
            </RouterLink>
            <!-- Contact: garis rute menuju amplop -->
            <RouterLink to="/contact" :class="[CELL, LINK, 'border-r border-border']">
              <span
                aria-hidden="true"
                class="absolute top-5 right-3 left-3 flex items-center gap-2 text-accent"
              >
                <span class="size-1.5 bg-accent"></span>
                <span class="flex-1 border-t border-dashed border-accent"></span>
                <FontAwesomeIcon :icon="['fas', 'envelope']" class="text-sm" />
              </span>
              Contact
            </RouterLink>
            <!-- Resume: sel gelap, unduhan PDF -->
            <a
              :href="resume"
              download
              :class="[CELL, 'bg-primary text-background-body hover:opacity-90']"
              aria-label="Download resume (PDF)"
            >
              <FontAwesomeIcon
                :icon="['fas', 'download']"
                class="absolute top-4 right-3 text-sm"
              />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </nav>

      <div>
        <p class="note mb-1">Elsewhere</p>
        <ul>
          <li v-for="channel in channels" :key="channel.label">
            <a
              :href="channel.href"
              :target="channel.href.startsWith('http') ? '_blank' : undefined"
              rel="noreferrer noopener"
              class="inline-flex min-h-11 items-center gap-3 text-base text-secondary hover:text-accent"
            >
              <FontAwesomeIcon :icon="channel.icon" class="w-4 text-sm" />
              {{ channel.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="wrap">
      <p class="note border-t border-border py-6 font-normal">
        © {{ new Date().getFullYear() }} Mujahidin. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import portfolios from "../data/portfolios.json";
import projects from "../data/projects.json";
import { channels, resume } from "../site";

const route = useRoute();
const showCta = computed(() => route.name !== "Contact");

const portfolioCount = portfolios.filter((item) => !item.hidden).length;
const projectCount = projects.filter((item) => !item.hidden).length;

// Label di kiri bawah, ciri sel di kanan atas
const CELL =
  "group relative flex min-h-24 flex-col justify-end overflow-hidden p-2.5 text-[0.9375rem] sm:p-3";
// Sel tautan halaman: aktif = latar berubah + garis tepi 1px berwarna aksen (tidak menebal)
const LINK =
  "text-secondary hover:bg-background-2 hover:text-primary aria-[current=page]:bg-background-2 aria-[current=page]:font-semibold aria-[current=page]:text-primary aria-[current=page]:shadow-[inset_0_0_0_1px_var(--color-accent)]";
const COUNT =
  "absolute top-2 right-3 font-display text-4xl font-normal text-primary";
</script>
