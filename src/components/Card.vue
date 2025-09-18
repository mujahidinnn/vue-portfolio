<template>
  <!-- Card -->
  <div
    class="group relative p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark shadow-sm hover:scale-[1.02] transition-all duration-300 ease-out flex flex-col justify-between gap-2 @container"
  >
    <!-- Tech Info Icon (pojok kanan atas) -->
    <div v-if="tech" class="absolute top-3 right-3" ref="popoverWrapper">
      <button
        @click.stop="toggleTech"
        class="text-gray-400 hover:text-gray-600 cursor-pointer text-sm transition-all"
        ref="popoverButton"
      >
        <FontAwesomeIcon :icon="['fas', 'circle-info']" />
      </button>

      <!-- Popover -->
      <div
        v-if="showTech"
        ref="popover"
        class="absolute top-8 right-0 bg-white dark:bg-gray-800 text-[11px] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg px-3 py-2 w-max max-w-[220px] z-10"
      >
        <p class="font-semibold text-primary dark:text-primary-dark mb-1">
          Tech Stack
        </p>
        <span>{{ tech }}</span>
      </div>
    </div>

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

        <slot />
      </div>
    </div>

    <!-- Footer -->
    <div
      class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-800 mt-auto relative"
    >
      <!-- Multiple Links -->
      <div v-if="links?.length" class="flex flex-col">
        <a
          v-for="(item, index) in links"
          :key="index"
          :href="item.link"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-1 text-xs font-medium text-primary dark:text-primary-dark hover:text-accent hover:underline transition-all"
        >
          <FontAwesomeIcon v-if="item.link" :icon="['fas', 'link']" />
          <span>{{ item.link.replace("https://", "") }}</span>
          <p
            v-if="item.link && item.desc"
            class="text-secondary dark:text-secondary-dark text-[10px]"
          >
            ({{ item.desc }})
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, inject } from "vue";

const activePopoverId = inject("activePopoverId");

const props = defineProps({
  image: String,
  title: String,
  description: String,
  tech: String,
  links: {
    type: Array,
    default: () => [],
  },
});

const loaded = ref(false);
const popoverWrapper = ref(null);
const uid = `${props.title}-${props.image}`;

function toggleTech() {
  activePopoverId.value = activePopoverId.value === uid ? null : uid;
}

function handleClickOutside(e) {
  if (
    activePopoverId.value === uid &&
    popoverWrapper.value &&
    !popoverWrapper.value.contains(e.target)
  ) {
    activePopoverId.value = null;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const showTech = computed(() => activePopoverId.value === uid);
</script>
