<template>
  <div>
    <section
      id="about"
      class="wrap grid items-start gap-x-20 gap-y-10 pt-8 lg:grid-cols-[1fr_22rem] lg:pt-20"
    >
      <header class="lg:col-span-2">
        <h1 class="display max-w-[16ch] text-h1">
          Finding beauty in simplicity.
        </h1>
      </header>

      <!-- Kolom samping: foto, lalu peta kecil rute belajar & bekerja (dari data pengalaman & pendidikan) -->
      <div class="w-full max-w-[22rem] lg:sticky lg:top-28 lg:order-2">
        <div
          class="plate relative aspect-[4/5] overflow-hidden bg-background-2 after:pointer-events-none after:absolute after:inset-0 dark:after:bg-black/10"
        >
          <img
            src="/me2.webp"
            alt="Portrait of Mujahidin"
            width="600"
            height="750"
            decoding="async"
            class="h-full w-full object-cover"
          />
        </div>
        <JourneyMap class="mt-8" />
      </div>

      <div class="max-w-[45rem] space-y-10">
        <div v-for="block in story" :key="block.title">
          <h2 class="text-h3 font-semibold text-primary">{{ block.title }}</h2>
          <p class="mt-3">{{ block.body }}</p>
        </div>

        <a
          href="https://medium.com/@mujahidindev"
          target="_blank"
          rel="noreferrer noopener"
          class="link"
        >
          <FontAwesomeIcon :icon="['fab', 'medium']" />
          Read my writing on Medium
        </a>
      </div>
    </section>

    <!-- Uses & Tools -->
    <section id="uses" class="wrap mt-section">
      <h2 class="display text-h2">Uses and tools</h2>
      <p class="mt-5 max-w-[45rem]">
        From client projects to personal experiments, I rely on a set of
        technologies and tools that help me work faster, stay organized, and
        keep the creative flow alive.
      </p>

      <div
        v-for="(tools, category) in groupedUses"
        :key="category"
        v-inview
        class="group mt-10"
      >
        <h3 class="mb-3 font-semibold text-primary">{{ category }}</h3>
        <div class="ruler" aria-hidden="true"></div>
        <ul
          class="grid grid-cols-2 gap-x-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          <li
            v-for="tool in tools"
            :key="tool.name"
            class="flex items-center gap-3 border-b border-border py-3"
          >
            <span class="size-8 shrink-0 rounded-card bg-paper p-1.5">
              <img
                :src="tool.icon"
                alt=""
                width="20"
                height="20"
                loading="lazy"
                class="h-full w-full object-contain grayscale group-hover:grayscale-0 pointer-coarse:group-data-[active=true]:grayscale-0"
              />
            </span>
            <span class="truncate text-small font-medium text-primary">
              {{ tool.name }}
            </span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import JourneyMap from "../components/JourneyMap.vue";
import uses from "../data/uses.json";

// Dikelompokkan per category (bila ada), urutan mengikuti kemunculan di JSON
const groupedUses = {};
for (const tool of uses) (groupedUses[tool.category ?? "Other"] ??= []).push(tool);

const story = [
  {
    title: "What I do",
    body: "I’m a front-end developer with over 4 years of experience building clean, responsive, and user-focused web applications. I combine minimalist design with performance, making every project both functional and visually engaging. Most of my work is data-heavy: admin dashboards, management systems, and enterprise portals for government and business clients, built mainly with React, Next.js, and Vue. I specialize in WebGIS, turning spatial data into interactive maps with Leaflet, MapLibre, and Turf.js. I care about the details users never notice when they work well: clear hierarchy, fast loading, and layouts that hold up on any screen.",
  },
  {
    title: "Away from the screen",
    body: "I keep things simple: coffee with palm sugar, a bowl of mie ayam, and time with people I care about. Movies and games are where I switch off, while music and books give me space to recharge and come back with a clearer head.",
  },
  {
    title: "What shapes my eye",
    body: "I love traveling for the journey as much as the destination, and I photograph the small details that often go unnoticed. Interior design and fashion pull me in the same way: mixing styles, trying themes, and noticing how a space or an outfit comes together. That habit of looking closely is what I bring back into my interfaces.",
  },
  {
    title: "Outlook",
    body: "I find beauty in simplicity. Meeting people from different backgrounds has made me more empathetic and open-minded, I see challenges as opportunities to grow, and I value collaboration as a way to create meaningful experiences together.",
  },
];
</script>
