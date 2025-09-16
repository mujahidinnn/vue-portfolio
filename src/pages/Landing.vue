<template>
  <component :is="isMobile ? MobileView : Home" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from "vue";
import Home from "./Home.vue";
import MobileView from "./MobileView.vue";

const isMobile = inject("isMobile");
</script>
