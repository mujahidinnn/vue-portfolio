<template>
  <!-- Card -->
  <div
    class="group p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark shadow-sm hover:scale-[1.02] transition-all duration-300 ease-out flex flex-col gap-4 @container"
  >
    <!-- Content -->
    <div class="flex flex-col @[325px]:flex-row items-start gap-4">
      <!-- Image wrapper -->
      <div
        class="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 p-2 flex items-center justify-center border border-gray-100 dark:border-gray-800 bg-white rounded-lg"
      >
        <!-- Skeleton -->
        <div
          v-if="!loaded"
          class="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"
        ></div>

        <!-- Real Image -->
        <img
          :src="image"
          :alt="title"
          loading="lazy"
          @load="loaded = true"
          @error="loaded = true"
          class="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-md transition-opacity duration-300"
          :class="loaded ? 'opacity-100' : 'opacity-0'"
        />
      </div>

      <!-- Text -->
      <div class="flex-1 flex flex-col">
        <h3
          class="text-base md:text-xl font-semibold text-gray-900 dark:text-gray-100 leading-snug"
        >
          {{ title }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">
          {{ description }}
        </p>

        <a
          v-if="visitLink"
          :href="visitLink"
          target="_blank"
          rel="noopener"
          class="text-xs font-medium flex items-center gap-1 text-primary dark:text-primary-dark my-2 hover:text-accent hover:underline transition-all w-max"
        >
          <FontAwesomeIcon :icon="['fas', 'link']" />
          <p>{{ visitLink.replace("https://", "") }}</p>
        </a>
        <slot />
      </div>
    </div>

    <!-- Footer -->
    <div
      v-if="tech"
      class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800"
    >
      <p
        class="text-[10px] sm:text-xs font-medium text-primary dark:text-primary-dark"
      >
        Tech: {{ tech }}
      </p>
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  image: String,
  title: String,
  description: String,
  tech: String,
  visitLink: String,
});

const loaded = ref(false);
</script>
