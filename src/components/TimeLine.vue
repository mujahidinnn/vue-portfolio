<template>
  <ol
    class="relative border-s border-dashed border-accent/20 dark:border-accent-dark/20 -ml-4 sm:ml-3 sm:border-s-2"
  >
    <li v-for="(item, idx) in items" :key="idx" class="mb-8 last:mb-0 ms-6 sm:ms-8">
      <!-- Marker -->
      <span
        class="absolute flex items-center justify-center w-5 h-5 -start-2.5 mt-2.5 sm:w-6 sm:h-6 sm:-start-3 sm:mt-1.5 rotate-45 rounded-md"
        :class="
          isCurrent(item.period)
            ? 'bg-accent/20 dark:bg-accent-dark/20'
            : 'bg-secondary-2/10 dark:bg-secondary-dark-2/10'
        "
      >
        <span
          class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm"
          :class="
            isCurrent(item.period)
              ? 'bg-accent dark:bg-accent-dark'
              : 'bg-secondary-2/40 dark:bg-secondary-dark-2/40'
          "
        ></span>
      </span>

      <div class="flex items-center gap-3">
        <div
          class="h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0 flex items-center justify-center bg-white rounded-lg sm:rounded-xl p-1.5 border border-gray-100 dark:border-gray-800"
        >
          <img
            :src="item.image"
            :alt="item.alt"
            width="40"
            height="40"
            class="w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        <div class="flex-1 min-w-0 flex items-start justify-between gap-3">
          <h4
            class="text-sm sm:text-base font-semibold text-primary dark:text-primary-dark"
          >
            {{ item.name }}
          </h4>
          <span
            class="shrink-0 text-[11px] sm:text-xs whitespace-nowrap mt-0.5"
            :class="
              isCurrent(item.period)
                ? 'text-accent dark:text-accent-dark font-semibold'
                : 'text-secondary-2 dark:text-secondary-dark-2 font-medium'
            "
          >
            {{ item.period }}
          </span>
        </div>
      </div>

      <div
        class="mt-2 space-y-0.5 text-xs sm:text-sm text-secondary-2 dark:text-secondary-dark-2"
      >
        <p class="flex items-center gap-1.5">
          <FontAwesomeIcon
            :icon="['fas', 'building']"
            class="text-[10px] text-accent dark:text-accent-dark opacity-70"
          />
          {{ item.subname }}
        </p>
        <p class="flex items-center gap-1.5">
          <FontAwesomeIcon
            :icon="['fas', 'location-dot']"
            class="text-[10px] text-accent dark:text-accent-dark opacity-70"
          />
          {{ item.location }}
        </p>
      </div>

      <p
        class="text-xs sm:text-sm text-secondary dark:text-secondary-dark leading-relaxed mt-2"
      >
        {{ item.description }}
      </p>
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

function isCurrent(period) {
  return typeof period === "string" && /present/i.test(period);
}
</script>
