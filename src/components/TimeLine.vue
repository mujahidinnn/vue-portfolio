<template>
  <!-- Garis waktu sebagai skala tegak: satu tik per entri, tik aksen untuk yang masih berjalan -->
  <ol class="border-l border-primary">
    <li
      v-for="(item, idx) in items"
      :key="idx"
      class="relative grid gap-x-8 gap-y-2 pb-10 pl-8 last:pb-0 before:absolute before:top-3 before:left-0 before:h-px md:grid-cols-[11rem_1fr] md:pl-10 md:before:top-10"
      :class="
        isCurrent(item.period)
          ? 'before:w-6 before:bg-accent'
          : 'before:w-3 before:bg-primary'
      "
    >
      <p
        class="note pt-0.5 md:pt-7.5"
        :class="isCurrent(item.period) && 'text-accent'"
      >
        {{ item.period }}
      </p>

      <!-- Mobile: deskripsi melebar penuh di bawah logo + judul. Desktop: deskripsi di kolom teks -->
      <div class="grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-3 md:gap-x-6 md:gap-y-0">
        <div
          class="size-12 shrink-0 rounded-card border border-border bg-paper p-2 md:row-span-2 md:size-20 md:p-3"
        >
          <img
            :src="item.image"
            :alt="item.alt"
            width="80"
            height="80"
            loading="lazy"
            class="h-full w-full object-contain"
          />
        </div>

        <div class="min-w-0">
          <h3 class="text-[1.0625rem] font-semibold text-primary">
            {{ item.name }}
          </h3>
          <p class="text-[0.9375rem] text-secondary-2">
            {{ item.subname }}, {{ item.location }}
          </p>
        </div>

        <p class="col-span-2 max-w-[70ch] text-base md:col-span-1 md:col-start-2 md:mt-3">
          {{ item.description }}
        </p>
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

function isCurrent(period) {
  return typeof period === "string" && /present/i.test(period);
}
</script>
