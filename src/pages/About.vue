<template>
  <section id="about" class="pt-8 sm:pt-20 mx-auto text-left">
    <div>
      <!-- Profile Image -->
      <img
        src="https://media.licdn.com/dms/image/v2/D5603AQEQ4OqcXOiWkQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1672473765433?e=1760572800&v=beta&t=z02PNmwpdEmcIdLQHT6tznf9xxmgHZv4uzyJKsGbFCY"
        alt="Mujahidin"
        class="float-left mr-4 mb-2 rounded-md shadow-md object-cover w-32 h-32"
      />

      <!-- About Text -->
      <h2
        class="text-xl sm:text-3xl font-semibold text-primary dark:text-primary-dark mb-4"
      >
        About Me
      </h2>

      <p
        class="text-secondary dark:text-secondary-dark text-sm sm:text-base leading-relaxed mb-3"
      >
        I’m a front-end developer with over 2 years of experience building
        clean, responsive, and user-focused web applications. I combine
        minimalist design with performance, making every project both functional
        and visually engaging.
      </p>

      <p
        class="text-secondary dark:text-secondary-dark text-sm sm:text-base leading-relaxed mb-3"
      >
        Beyond coding, I enjoy coffee — especially when it’s mixed with palm
        sugar, my absolute favorite. I’m also a fan of mie ayam, and I really
        treasure quality time with people I care about. For me, these simple
        joys fuel creativity and balance in life. I also love interior design,
        movies, and games, as they often spark inspiration and give me fresh
        ideas to bring into my work. At the same time, I treasure simple joys
        like mie ayam or spending quality time with people I care about, because
        those little things fuel creativity and balance in my life.
      </p>

      <p
        class="text-secondary dark:text-secondary-dark text-sm sm:text-base leading-relaxed mb-3"
      >
        I also love traveling — not only the destinations, but the journey
        itself. Every trip is filled with small, unforgettable moments that turn
        into valuable experiences and lasting memories. Along the way, I enjoy
        capturing photos of places, vibes, and little things that often go
        unnoticed, as a way to preserve memories and appreciate life’s details.
      </p>

      <p
        class="text-secondary dark:text-secondary-dark text-sm sm:text-base leading-relaxed mb-3"
      >
        Fashion is another part of my life I deeply enjoy. I love exploring
        different outfits, mix and match styles, and experimenting with themes.
        It’s not just about clothing, but about expressing creativity, mood, and
        identity in everyday life.
      </p>

      <p
        class="text-secondary dark:text-secondary-dark text-sm sm:text-base leading-relaxed"
      >
        At the core, I’m someone who finds beauty in simplicity. Whether it’s a
        cup of coffee, a walk at sunset, or a moment of laughter with friends, I
        believe life’s meaning comes from noticing and appreciating these little
        things. Music and books are also part of my routine — they give me space
        to recharge and spark new perspectives. Meeting people from different
        backgrounds and learning their stories has shaped me to be more
        empathetic, open-minded, and inspired. I see challenges as opportunities
        to grow, both in coding and in life, and I value collaboration as a way
        to create meaningful experiences together.
      </p>
    </div>

    <!-- Uses & Tools -->
    <div
      ref="usesSection"
      class="my-10 py-6 text-secondary dark:text-secondary-dark border-t border-gray-200 dark:border-gray-700"
    >
      <p class="text-lg font-semibold mb-2 text-primary dark:text-primary-dark">
        <FontAwesomeIcon
          :icon="['fas', 'laptop-code']"
          size="xs"
          class="text-secondary"
        />
        Uses & Tools
      </p>
      <p class="text-sm sm:text-base mb-2">
        From client projects to personal experiments, I rely on a set of
        technologies and tools that help me work faster, stay organized, and
        keep the creative flow alive.
      </p>
      <p class="mb-6">Here are the main stacks I often use in development:</p>

      <!-- Skeleton loading -->
      <div
        v-if="loadingUses"
        class="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-6"
      >
        <div
          v-for="n in 8"
          :key="n"
          class="flex flex-col items-center text-center p-2 rounded-md border border-gray-200 dark:border-gray-800 animate-pulse"
        >
          <div
            class="rounded-full bg-gray-200 dark:bg-gray-700 w-12 h-12 mb-2"
          />
          <div class="h-3 bg-gray-200 dark:bg-gray-600 w-1/3 rounded" />
        </div>
      </div>

      <div class="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <div
          v-for="tool in uses"
          :key="tool.name"
          class="flex flex-col items-center text-center p-2 rounded-md border border-gray-200 hover:border-accent/30 dark:border-gray-800 filter grayscale hover:grayscale-0 transition duration-300"
          :class="{
            'filter grayscale': !isActive,
            'filter-none': isActive,
          }"
        >
          <div
            class="rounded-full shadow-md shadow-gray-200 dark:shadow-gray-800 flex justify-center items-center p-2 mb-2"
          >
            <img
              :src="tool.icon"
              :alt="tool.name"
              class="w-5 h-5 sm:w-9 sm:h-9 object-contain"
            />
          </div>
          <span class="text-[10px] sm:text-sm font-medium">{{
            tool.name
          }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject, ref, watch, onMounted } from "vue";

const scrollY = inject("scrollY");
const isActive = ref(false);
const usesSection = ref(null);

const uses = ref([]);
const loadingUses = ref(false);

onMounted(async () => {
  loadingUses.value = true;
  const res = await fetch("/data/uses.json");
  uses.value = await res.json();
  loadingUses.value = false;

  watch(scrollY, () => {
    if (!usesSection.value) return;
    const rect = usesSection.value.getBoundingClientRect();

    if (rect.top <= 300) {
      isActive.value = true;
    } else {
      isActive.value = false;
    }
  });
});
</script>
