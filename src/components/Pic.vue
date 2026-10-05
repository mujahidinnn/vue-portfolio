<template>
  <picture>
    <source :srcset="src" type="image/avif" />
    <img :src="src.replace(/\.avif$/, '.webp')" v-bind="$attrs" />
  </picture>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });
defineProps<{ src: string }>();
</script>
