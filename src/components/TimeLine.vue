<template>
  <ol class="relative border-s border-accent/50 dark:border-accent/30 ml-3">
    <!-- Skeleton Loader -->
    <template v-if="loading">
      <li v-for="n in 2" :key="'skeleton-' + n" class="mb-10 ms-6 last:mb-0">
        <!-- Dot -->
        <span
          class="absolute flex items-center justify-center w-6 h-6 bg-accent/10 -start-3 mt-4 rotate-45 rounded-md"
        >
          <span class="w-3 h-3 bg-accent rounded-sm"></span>
        </span>

        <!-- Block -->
        <div class="flex gap-5 animate-pulse">
          <!-- Icon placeholder -->
          <div
            class="h-12 w-12 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded mt-1 shadow"
          />

          <!-- Text placeholder -->
          <div class="flex-1 space-y-2 mt-1">
            <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
            <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
            <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/3" />
          </div>
        </div>
      </li>
    </template>

    <!-- Real Data -->
    <template v-else>
      <li v-for="(item, idx) in items" :key="idx" class="mb-10 ms-6 last:mb-0">
        <!-- Dot -->
        <span
          class="absolute flex items-center justify-center w-6 h-6 bg-accent/20 -start-3 mt-4 rotate-45 rounded-md"
        >
          <span class="w-3 h-3 bg-accent rounded-sm"></span>
        </span>

        <!-- Block -->
        <div class="flex gap-5">
          <div
            class="h-12 w-12 flex justify-center items-center bg-white rounded mt-1 shadow p-2 flex-shrink-0"
          >
            <img
              :src="item.image"
              :alt="item.alt"
              class="h-8 w-8 object-contain"
            />
          </div>

          <div>
            <h4 class="text-primary dark:text-primary-dark font-medium">
              {{ item.name }}
              <span class="text-secondary dark:text-secondary-dark">{{
                item.subname
              }}</span>
            </h4>
            <p
              class="text-secondary dark:text-secondary-dark text-sm sm:text-base mt-2"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
      </li>
    </template>
  </ol>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
