<template>
  <section id="contact" class="py-20 max-w-2xl mx-auto text-center px-4">
    <!-- Title -->
    <h2
      class="text-2xl sm:text-4xl font-bold text-primary dark:text-primary-dark mb-4"
    >
      Let’s Connect 🤝
    </h2>

    <!-- Subtitle -->
    <p
      class="text-secondary dark:text-secondary-dark mb-8 text-sm sm:text-base"
    >
      Looking for a coding partner, a new opportunity, or just want to say
      hello? Reach out through any of the platforms below ✨
    </p>

    <!-- Social Links -->
    <div
      class="flex justify-center gap-6 flex-wrap text-primary dark:text-primary-dark text-lg mb-8"
    >
      <a
        href="https://github.com/mujahidinnn"
        target="_blank"
        rel="noreferrer noopener"
        class="group flex items-center gap-2 text-sm sm:text-base transition"
      >
        <FontAwesomeIcon
          :icon="['fab', 'github']"
          class="group-hover:text-accent transition-colors"
        />
        <span class="group-hover:text-accent transition-colors">GitHub</span>
      </a>

      <a
        href="https://www.linkedin.com/in/mujahidin18"
        target="_blank"
        rel="noreferrer noopener"
        class="group flex items-center gap-2 text-sm sm:text-base transition"
      >
        <FontAwesomeIcon
          :icon="['fab', 'linkedin']"
          class="group-hover:text-accent transition-colors"
        />
        <span class="group-hover:text-accent transition-colors">LinkedIn</span>
      </a>

      <a
        href="https://www.instagram.com/mujahidin1802"
        target="_blank"
        rel="noreferrer noopener"
        class="group flex items-center gap-2 text-sm sm:text-base transition"
      >
        <FontAwesomeIcon
          :icon="['fab', 'instagram']"
          class="group-hover:text-accent transition-colors"
        />
        <span class="group-hover:text-accent transition-colors">Instagram</span>
      </a>

      <a
        href="mailto:mujahidin23894@gmail.com"
        class="group flex items-center gap-2 text-sm sm:text-base transition"
      >
        <FontAwesomeIcon
          :icon="['fas', 'envelope']"
          class="group-hover:text-accent transition-colors"
        />
        <span class="group-hover:text-accent transition-colors">Email</span>
      </a>
    </div>

    <!-- Direct Email -->
    <p class="text-secondary dark:text-secondary-dark text-sm sm:text-base">
      Or drop me a direct email 👉
      <a
        href="mailto:mujahidin23894@gmail.com"
        class="text-primary dark:text-primary-dark underline hover:text-accent transition-colors"
      >
        mujahidin23894@gmail.com
      </a>
    </p>
  </section>
</template>
