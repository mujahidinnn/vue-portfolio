<template>
  <section
    id="home"
    class="pt-12 sm:pt-20 mx-auto text-left min-h-[calc(100vh_-_68px)] flex flex-col justify-center"
  >
    <div class="flex flex-col sm:flex-row gap-5 sm:items-center mb-6">
      <div class="hidden md:block relative shrink-0 md:w-28 md:h-28 lg:w-32 lg:h-32 group">
        <div
          class="absolute -inset-3 rounded-full bg-gradient-to-br from-accent to-accent-dark/60 dark:from-accent-dark dark:to-accent opacity-25 dark:opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-40"
          aria-hidden="true"
        ></div>
        <div
          class="relative w-full h-full rounded-full p-[3px] bg-gradient-to-br from-accent to-accent-dark/70 dark:from-accent-dark dark:to-accent shadow-lg shadow-accent/20 dark:shadow-accent-dark/20 transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        >
          <img
            src="/me.webp"
            alt="Mujahidin"
            fetchpriority="high"
            class="w-full h-full rounded-full object-cover bg-background dark:bg-background-dark"
            width="128"
            height="128"
          />
        </div>
      </div>

      <div>
        <h1
          class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary dark:text-primary-dark leading-snug"
        >
          Mujahidin — Designing Elegant and <br />
          Intuitive Web Experiences
        </h1>
      </div>
    </div>

    <p
      class="text-secondary dark:text-secondary-dark max-w-2xl text-sm sm:text-base mb-8"
    >
      Hello, I am Mujahidin — a Frontend Web Developer specializing in complex,
      data-driven applications, with a dedicated focus on Frontend WebGIS
      integration and spatial data visualization. Experienced in architecting
      high-performance management dashboards, interactive charting, and scalable
      enterprise portals that bridge rigorous technical requirements with
      intuitive user interfaces.
    </p>

    <div
      class="flex items-center gap-3 text-2xl text-accent dark:text-accent-dark"
    >
      <a
        href="https://www.linkedin.com/in/mujahidin18"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Visit my LinkedIn profile"
      >
        <FontAwesomeIcon
          :icon="['fab', 'square-linkedin']"
          class="cursor-pointer hover:opacity-80 transition"
        />
      </a>
      <a
        href="https://github.com/mujahidinnn"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Visit my GitHub profile"
      >
        <FontAwesomeIcon
          :icon="['fab', 'github']"
          class="cursor-pointer hover:opacity-80 transition"
        />
      </a>
      <a href="mailto:mujahidin28394@gmail.com" aria-label="Send me an email">
        <FontAwesomeIcon
          :icon="['fas', 'envelope']"
          class="cursor-pointer hover:opacity-80 transition"
        />
      </a>
    </div>

    <a
      href="/Mujahidin-Frontend.pdf"
      download
      class="inline-flex items-center gap-2 mt-2 sm:mt-4 mb-3 sm:mb-6 h-max w-max bg-accent dark:bg-accent-dark text-white text-sm sm:text-base font-medium px-5 py-2 rounded-lg shadow-sm transition-all hover:opacity-80 hover:shadow-md"
    >
      <FontAwesomeIcon :icon="['fas', 'download']" />
      <span>Download Resume</span>
    </a>

    <!-- Work Experience -->
    <h3
      id="work-experience"
      class="text-xl sm:text-2xl font-semibold text-primary dark:text-primary-dark my-4 sm:my-8"
    >
      <FontAwesomeIcon :icon="['fas', 'briefcase']" class="text-secondary-2" />
      Work Experience
    </h3>
    <TimeLine :items="workExperiences" />

    <!-- Education -->
    <h3
      id="education"
      class="text-xl sm:text-2xl font-semibold text-primary dark:text-primary-dark my-4 sm:my-8"
    >
      <FontAwesomeIcon
        :icon="['fas', 'graduation-cap']"
        class="text-secondary-2"
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
</script>
