<template>
  <section class="wrap pt-8 lg:pt-12">
    <div
      class="plate relative flex flex-col items-center overflow-hidden px-5 py-16 text-center lg:py-24"
    >
      <ContourField class="inset-0 h-full w-full" />
      <h1 class="display relative text-[clamp(7rem,4rem+16vw,14rem)] leading-none">
        404
      </h1>
      <p class="relative mt-4 mb-8">
        This page is off the map. The address may be mistyped or the page moved.
      </p>
      <RouterLink to="/" class="btn btn-primary relative">Back to home</RouterLink>
    </div>
  </section>
</template>

<script setup>
import ContourField from "../components/ContourField.vue";
</script>
