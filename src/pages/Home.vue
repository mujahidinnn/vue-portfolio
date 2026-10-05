<template>
  <div class="overflow-x-clip">
    <!-- Jangan taruh komentar di atas div akar ini: di mode dev komentar ikut jadi node akar,
         dan <Transition> di App.vue butuh tepat satu elemen akar (halaman berikutnya jadi tidak muncul).
         overflow-x-clip: kontur hero boleh melewati tepi layar tanpa memicu scroll mendatar. -->
    <!-- Hero: foto di atas bukit kontur, tanpa bingkai luar -->
    <section id="home" class="wrap lg:pt-6">
      <div class="relative isolate lg:py-8">
        <div
          class="relative grid grid-cols-1 items-center gap-x-12 gap-y-4 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_420px]"
        >
          <div class="relative mx-auto w-[280px] sm:w-[360px] lg:order-2 lg:w-full">
            <!-- Kontur diposisikan relatif terhadap foto, ukurannya dijaga agar tidak menimpa menu di atas
                 maupun batang angka di bawah.
                 Di bawah lg dipotong setinggi foto supaya garis tidak masuk ke teks. -->
            <div
              class="absolute inset-0 -z-10 overflow-y-clip lg:overflow-y-visible"
            >
              <ContourField
                class="-top-[25.2%] -left-[112.9%] h-[168.6%] w-[242.8%] max-w-none"
              />
            </div>
            <div
              class="plate relative aspect-[4/5] overflow-hidden bg-background-2 after:pointer-events-none after:absolute after:inset-0 dark:after:bg-black/10"
            >
            <picture>
              <source
                type="image/avif"
                srcset="/hero-480.avif 480w, /hero-800.avif 800w"
                :sizes="HERO_SIZES"
              />
              <img
                src="/hero-800.webp"
                srcset="/hero-480.webp 480w, /hero-800.webp 800w"
                :sizes="HERO_SIZES"
                width="800"
                height="1000"
                alt="Portrait of Mujahidin"
                fetchpriority="high"
                decoding="async"
                class="h-full w-full object-cover object-top"
              />
            </picture>
            </div>
          </div>

          <!-- Di mobile tombol naik ke atas paragraf agar CTA terlihat tanpa menggulir -->
          <div class="flex flex-col">
            <p class="note mt-2 lg:mt-0">Mujahidin, frontend web developer</p>
            <h1 class="display mt-1 text-h1 lg:mt-4">
              Elegant, intuitive web experiences.
            </h1>
            <p class="order-1 mt-6 max-w-[34rem] lg:order-none">
              {{ stats[0].value }} years of building data-driven dashboards,
              enterprise portals, and WebGIS applications that turn rigorous
              technical requirements into interfaces people find easy to use.
            </p>
            <div class="mt-4 flex flex-wrap gap-3 lg:mt-8">
              <RouterLink to="/projects" class="btn btn-primary">
                View work
              </RouterLink>
              <a
                :href="resume"
                download
                class="btn btn-secondary bg-background-body"
              >
                Download resume
              </a>
            </div>
            <ul class="order-2 mt-4 -ml-3 flex lg:order-none">
              <li v-for="channel in socials" :key="channel.label">
                <a
                  :href="channel.href"
                  :target="channel.href.startsWith('http') ? '_blank' : undefined"
                  rel="noreferrer noopener"
                  :aria-label="channel.label"
                  class="grid size-11 place-items-center text-[1.375rem] text-secondary hover:text-accent"
                >
                  <FontAwesomeIcon :icon="channel.icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Tepi lembar: domisili -->
      <p class="note mt-6 lg:mt-4">
        Jakarta, Indonesia
      </p>
    </section>

    <!-- Angka kepercayaan sebagai batang skala peta -->
    <section class="wrap mt-10 lg:mt-14" aria-label="Experience in numbers">
      <dl class="grid grid-cols-3">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="flex flex-col-reverse"
        >
          <dt class="note pr-3">{{ stat.label }}</dt>
          <dd class="display mt-3 text-h1">{{ stat.value }}</dd>
          <span
            aria-hidden="true"
            class="order-last h-2 border border-primary"
            :class="[i % 2 === 0 && 'bg-primary', i > 0 && 'border-l-0']"
          ></span>
        </div>
      </dl>
    </section>

    <!-- Selected work -->
    <section id="work" class="wrap mt-section">
      <h2 class="display text-h2">Selected work</h2>

      <div v-for="group in selectedWork" :key="group.title" class="mt-10">
        <div class="flex flex-wrap items-center justify-between gap-x-4">
          <h3 class="text-h3 font-semibold text-primary">{{ group.title }}</h3>
          <RouterLink :to="group.to" class="link">
            {{ group.linkLabel }}
          </RouterLink>
        </div>
        <div class="ruler" aria-hidden="true"></div>
        <div class="mt-8 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <Card v-for="item in group.items" :key="item.title" v-bind="item" />
        </div>
      </div>
    </section>

    <!-- Work experience -->
    <section id="work-experience" class="wrap mt-section">
      <h2 class="display mb-8 text-h2">Work experience</h2>
      <TimeLine :items="workExperiences" />
    </section>

    <!-- Education -->
    <section id="education" class="wrap mt-section">
      <h2 class="display mb-8 text-h2">Education</h2>
      <TimeLine :items="educations" />
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import Card from "../components/Card.vue";
import ContourField from "../components/ContourField.vue";
import TimeLine from "../components/TimeLine.vue";
import workExperiences from "../data/work-experiences.json";
import educations from "../data/educations.json";
import portfolios from "../data/portfolios.json";
import projects from "../data/projects.json";
import { channels, resume } from "../site";

// Harus sama dengan imagesizes pada preload di index.html
const HERO_SIZES = "(min-width: 1024px) 420px, (min-width: 640px) 360px, 280px";

const socials = channels.filter((c) =>
  ["LinkedIn", "GitHub", "Email"].includes(c.label)
);

// Tahun pengalaman = selisih tahun kalender dari pengalaman kerja paling awal
const firstYear = Math.min(
  ...workExperiences.map((w) => Number(w.period.match(/\d{4}/)[0]))
);
const stats = [
  { value: `${new Date().getFullYear() - firstYear}+`, label: "Years of experience" },
  { value: projects.filter((p) => !p.hidden).length, label: "Client projects" },
  { value: portfolios.filter((p) => !p.hidden).length, label: "Personal portfolios" },
];

// Satu baris, tiga kartu per kelompok (karya featured sesuai urutan data)
const PER_GROUP = 3;
const isFeatured = (item) => item.featured && !item.hidden;
const selectedWork = [
  {
    title: "Client projects",
    to: "/projects",
    linkLabel: "View all projects",
    items: [...projects].reverse().filter(isFeatured).slice(0, PER_GROUP),
  },
  {
    title: "Personal portfolios",
    to: "/portfolios",
    linkLabel: "View all portfolios",
    items: portfolios.filter(isFeatured).slice(0, PER_GROUP),
  },
];
</script>
