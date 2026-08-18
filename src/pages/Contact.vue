<template>
  <section
    id="contact"
    class="min-h-[calc(100vh_-_68px)] flex flex-col justify-center py-16 max-w-3xl mx-auto text-center px-4"
  >
    <!-- Title -->
    <h1
      class="text-2xl sm:text-4xl font-bold text-primary dark:text-primary-dark mb-4"
    >
      Let's build something great 🤝
    </h1>

    <!-- Subtitle -->
    <p
      class="text-secondary dark:text-secondary-dark mb-10 text-sm sm:text-base max-w-xl mx-auto"
    >
      Looking for a coding partner, a new opportunity, or just want to say
      hello? Pick a platform below and reach out ✨
    </p>

    <!-- Channels -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left mb-10">
      <a
        v-for="channel in channels"
        :key="channel.label"
        :href="channel.href"
        :target="channel.external ? '_blank' : undefined"
        :rel="channel.external ? 'noreferrer noopener' : undefined"
        :aria-label="channel.label"
        class="group flex items-center gap-3 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark hover:border-accent/40 dark:hover:border-accent-dark/40 hover:shadow-lg hover:shadow-accent/10 dark:hover:shadow-accent-dark/10 hover:-translate-y-0.5 transition-all duration-300"
      >
        <span
          class="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-accent/10 text-accent dark:bg-accent-dark/15 dark:text-accent-dark group-hover:bg-accent group-hover:text-white dark:group-hover:bg-accent-dark transition-colors"
        >
          <FontAwesomeIcon :icon="channel.icon" class="text-sm" />
        </span>
        <span class="flex-1 min-w-0">
          <span
            class="block text-sm font-semibold text-primary dark:text-primary-dark"
            >{{ channel.label }}</span
          >
          <span
            class="block text-xs text-secondary-2 dark:text-secondary-dark-2 truncate"
            >{{ channel.sub }}</span
          >
        </span>
      </a>
    </div>

    <!-- Direct Email -->
    <p class="text-secondary dark:text-secondary-dark text-sm sm:text-base">
      Or drop me a direct email 👉
      <a
        href="mailto:mujahidin28394@gmail.com"
        class="text-primary dark:text-primary-dark underline decoration-accent/40 hover:text-accent dark:hover:text-accent-dark transition-colors"
        aria-label="Send me an email"
      >
        mujahidin28394@gmail.com
      </a>
    </p>
  </section>
</template>

<script setup>
const channels = [
  {
    label: "LinkedIn",
    sub: "Let's connect professionally",
    href: "https://www.linkedin.com/in/mujahidin18",
    icon: ["fab", "linkedin"],
    external: true,
  },
  {
    label: "GitHub",
    sub: "Check out my code",
    href: "https://github.com/mujahidinnn",
    icon: ["fab", "github"],
    external: true,
  },
  {
    label: "Instagram",
    sub: "Behind the scenes",
    href: "https://www.instagram.com/mujahidin1802",
    icon: ["fab", "instagram"],
    external: true,
  },
  {
    label: "Discord",
    sub: "Chat with me",
    href: "https://discord.com/users/1077911957719502938",
    icon: ["fab", "discord"],
    external: true,
  },
  {
    label: "Gmail",
    sub: "mujahidin28394@gmail.com",
    href: "mailto:mujahidin28394@gmail.com",
    icon: ["fas", "envelope"],
    external: false,
  },
];
</script>
