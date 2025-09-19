<template>
  <!-- Card Skeleton -->
  <div
    class="relative p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark shadow-sm flex flex-col justify-between gap-2 animate-pulse @container"
  >
    <div
      class="absolute top-3 right-3 w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded-full"
    ></div>
    <!-- Content -->
    <div class="flex flex-col @[325px]:flex-row items-start gap-4">
      <!-- Image Skeleton -->
      <div
        class="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 p-2 border border-gray-100 dark:border-gray-800 bg-gray-200 dark:bg-gray-700 rounded-lg"
      ></div>

      <!-- Text Skeleton -->
      <div class="flex-1 flex flex-col gap-2 w-full">
        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-2/3"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-full"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-5/6"></div>
      </div>
    </div>

    <!-- Footer Skeleton -->
    <div
      class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-800 mt-auto"
    >
      <div class="flex flex-col gap-1 w-2/3">
        <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  </div>
</template>
