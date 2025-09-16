<template>
  <ol class="relative border-s border-accent/50 dark:border-accent/30 ml-3">
    <li v-for="(item, idx) in items" :key="idx" class="mb-10 ms-6 last:mb-0">
      <!-- Dot -->
      <span
        class="absolute flex items-center justify-center w-6 h-6 bg-accent/20 rounded-full -start-3"
      >
        <span class="w-3 h-3 bg-accent rounded-full"></span>
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
  </ol>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>
