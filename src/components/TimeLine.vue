<template>
  <ol class="relative border-s border-accent/50 dark:border-accent/30 ml-3">
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
          class="h-12 w-12 flex justify-center items-center bg-white rounded shadow p-1 flex-shrink-0"
        >
          <img
            :src="item.image"
            :alt="item.alt"
            width="48"
            height="48"
            class="h-12 w-12 object-contain"
            loading="lazy"
          />
        </div>

        <div>
          <h4 class="text-primary dark:text-primary-dark font-medium">
            {{ item.name }}
            <span class="text-secondary-2 dark:text-secondary-dark-2"> | </span>
            <span class="text-secondary-2 dark:text-secondary-dark-2">{{
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
  </ol>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>
