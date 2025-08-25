<template>
  <!-- Desktop -->
  <div
    class="relative group p-6 rounded-xl shadow bg-white hover:shadow-md hover:shadow-primary/30 transition hidden md:flex flex-col"
  >
    <!-- Corner Visit Ribbon -->
    <a
      v-if="visitLink"
      :href="visitLink"
      target="_blank"
      rel="noopener"
      class="absolute top-0 right-0 z-10 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-tr-xl rounded-bl-xl shadow-md hover:bg-accent transition-all flex items-center gap-1"
    >
      Visit
      <i class="fas fa-external-link-alt text-[0.7rem]"></i>
    </a>

    <!-- Main content area -->
    <div class="flex flex-col justify-between flex-1 gap-4">
      <div class="flex">
        <img
          :src="image"
          :alt="title"
          class="w-30 h-30 rounded-md border border-gray-100 p-2"
        />
        <div class="flex-1 ml-4">
          <h3 class="text-xl font-semibold text-primary mb-2">{{ title }}</h3>
          <p class="text-sm text-secondary mb-2">{{ description }}</p>
          <slot />
        </div>
      </div>
    </div>

    <!-- Always at the bottom -->
    <div v-if="tech" class="mt-auto pt-3">
      <p class="text-sm text-primary">Tech: {{ tech }}</p>
      <slot name="footer" />
    </div>
  </div>

  <!-- Mobile -->
  <div
    class="relative group p-4 rounded-xl shadow bg-white hover:shadow-md hover:shadow-primary/30 transition flex flex-col md:hidden gap-1"
  >
    <!-- Corner Visit Ribbon -->
    <a
      v-if="visitLink"
      :href="visitLink"
      target="_blank"
      rel="noopener"
      class="absolute top-0 right-0 z-10 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-tr-xl rounded-bl-xl shadow-md hover:bg-accent transition-all flex items-center gap-1"
    >
      Visit
      <i class="fas fa-external-link-alt text-[0.7rem]"></i>
    </a>

    <div class="flex gap-4 items-center">
      <img
        :src="image"
        :alt="title"
        class="w-20 h-20 rounded-md border border-gray-100"
      />
      <h3 class="text-base font-semibold text-primary">{{ title }}</h3>
    </div>

    <p class="text-xs text-secondary mt-1">{{ description }}</p>
    <slot />

    <p v-if="tech" class="text-xs text-primary mt-auto pt-4">
      Tech: {{ tech }}
    </p>
    <slot name="footer" />
  </div>
</template>

<script setup>
defineProps({
  image: String,
  title: String,
  description: String,
  tech: String,
  visitLink: String,
});
</script>
