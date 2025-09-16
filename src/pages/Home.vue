<template>
  <section
    id="home"
    class="pt-12 sm:pt-20 mx-auto text-left min-h-[calc(100vh_-_68px)] flex flex-col justify-center"
  >
    <div class="flex gap-5">
      <img
        src="https://media.licdn.com/dms/image/v2/D5603AQEQ4OqcXOiWkQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1672473765433?e=1760572800&v=beta&t=z02PNmwpdEmcIdLQHT6tznf9xxmgHZv4uzyJKsGbFCY"
        alt="Mujahidin"
        class="hidden sm:block rounded-full transition-transform duration-200 ease-in-out w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
        :style="{
          transform: `scale(${Math.max(0.3, 1 - scrollY / 180)})`,
          transformOrigin: 'top left',
          transition: 'transform 0.1s linear',
        }"
      />
      <h2
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary dark:text-primary-dark mb-6 leading-snug"
      >
        Designing Elegant and <br />
        Intuitive Web Experiences
      </h2>
    </div>

    <p
      class="text-secondary dark:text-secondary-dark max-w-2xl text-base sm:text-lg mb-8"
    >
      Hello, I am Mujahidin — a front-end developer passionate about creating
      clean, responsive, and visually engaging digital products. I focus on
      usability and aesthetics to deliver seamless experiences that truly
      connect with users.
    </p>

    <div class="flex items-center gap-3 text-2xl text-accent">
      <a
        href="https://www.linkedin.com/in/mujahidin18"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FontAwesomeIcon
          :icon="['fab', 'linkedin']"
          class="cursor-pointer hover:opacity-80 transition"
        />
      </a>
      <a
        href="https://github.com/mujahidinnn"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FontAwesomeIcon
          :icon="['fab', 'github']"
          class="cursor-pointer hover:opacity-80 transition"
        />
      </a>
      <a href="mailto:mujahidin28394@gmail.com">
        <FontAwesomeIcon
          :icon="['fas', 'envelope']"
          class="cursor-pointer hover:opacity-80 transition"
        />
      </a>
    </div>

    <a
      href="/pdf/Mujahidin-Resume.pdf"
      download
      class="inline-flex items-center gap-2 mt-4 mb-6 h-max w-max bg-accent text-white dark:text-black font-medium px-5 py-2 rounded-lg shadow-sm transition-all hover:opacity-80 hover:shadow-md"
    >
      <FontAwesomeIcon :icon="['fas', 'download']" />
      <span>Download Resume</span>
    </a>

    <!-- Work Experience -->
    <h3
      class="text-xl sm:text-2xl font-semibold text-primary dark:text-primary-dark my-8"
    >
      <FontAwesomeIcon
        :icon="['fas', 'briefcase']"
        size="xs"
        class="text-secondary"
      />
      Work Experience
    </h3>
    <TimeLine :items="workExperiences" />

    <!-- Education -->
    <h3
      class="text-xl sm:text-2xl font-semibold text-primary dark:text-primary-dark my-8"
    >
      <FontAwesomeIcon
        :icon="['fas', 'graduation-cap']"
        size="xs"
        class="text-secondary"
      />
      Education
    </h3>
    <TimeLine :items="educations" />
  </section>
</template>

<script setup>
import TimeLine from "../components/TimeLine.vue";
import workExperiences from "../data/work-experiences.json";
import educations from "../data/educations.json";

import { ref, onMounted, onUnmounted } from "vue";

const scrollY = ref(0);
const targetX = ref(0);
const targetY = ref(0);

function handleScroll() {
  scrollY.value = window.scrollY;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  // cari posisi slot navbar (kiri atas)
  const slot = document.querySelector(".navbar-avatar-slot");
  if (slot) {
    const rect = slot.getBoundingClientRect();
    // simpan posisi relatif
    targetX.value = rect.left;
    targetY.value = rect.top;
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
