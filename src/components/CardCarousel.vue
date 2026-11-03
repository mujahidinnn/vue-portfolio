<template>
  <div>
    <!-- Mobile: carousel cover flow (scroll-snap + view timeline); ≥sm: grid biasa -->
    <div
      ref="track"
      class="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[calc((100%+2.5rem-74vw)/2)] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 sm:overflow-visible sm:px-0 lg:grid-cols-3"
      @scroll.passive="onScroll"
    >
      <!-- Pembungkus: Card punya dua root (article + dialog), class tak diteruskan -->
      <!-- Tiga set agar bisa berputar: set tengah asli, dua lainnya salinan khusus mobile -->
      <div
        v-for="(item, i) in loop"
        :key="i"
        :inert="isClone(i)"
        class="cover-item w-[74vw] shrink-0 snap-center snap-always sm:w-auto"
        :class="(isClone(i) || i - size >= limit) && 'sm:hidden'"
      >
        <Card v-bind="item" />
      </div>
    </div>

    <!-- Penanda persegi + nomor lembar -->
    <div class="mt-5 flex items-center gap-2 sm:hidden">
      <button
        v-for="(item, i) in items"
        :key="item.title"
        type="button"
        :aria-label="`Show ${item.title}`"
        :aria-current="i === active"
        class="grid size-6 place-items-center"
        @click="go(i)"
      >
        <span
          class="size-2 border border-primary transition-colors"
          :class="i === active && 'bg-primary'"
        ></span>
      </button>
      <span class="note ml-auto tabular-nums">
        {{ pad(active + 1) }} / {{ pad(items.length) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import Card from "./Card.vue";

const props = defineProps({
  items: { type: Array, required: true },
  // Jumlah kartu pada grid ≥sm; mobile tetap menampilkan semua
  limit: { type: Number, default: Infinity },
});

const track = ref(null);
const active = ref(0);
const pad = (n) => String(n).padStart(2, "0");

const size = computed(() => props.items.length);
const loop = computed(() => [...props.items, ...props.items, ...props.items]);
const isClone = (i) => i < size.value || i >= size.value * 2;

// Jarak antarkartu; 0 pada ≥sm karena salinan disembunyikan
const step = () => {
  const [a, b] = track.value.children;
  return b.offsetLeft - a.offsetLeft;
};
const position = () => Math.round(track.value.scrollLeft / step());

const center = () => {
  if (step()) track.value.scrollLeft = size.value * step();
};

// Setelah scroll berhenti, lompat tanpa animasi kembali ke set tengah
let settle;
const onScroll = () => {
  if (!step()) return;
  active.value = position() % size.value;
  clearTimeout(settle);
  settle = setTimeout(() => {
    const i = position();
    if (i < size.value) track.value.scrollLeft += size.value * step();
    else if (i >= size.value * 2) track.value.scrollLeft -= size.value * step();
  }, 120);
};

const go = (i) =>
  track.value.children[size.value + i].scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });

const mq = window.matchMedia("(max-width: 639px)");
onMounted(() => {
  center();
  mq.addEventListener("change", center);
});
onUnmounted(() => {
  clearTimeout(settle);
  mq.removeEventListener("change", center);
});
</script>

<style scoped>
/* Kartu sedikit mengecil saat menjauh dari tengah; tanpa dukungan = carousel datar */
@media (max-width: 639px) {
  @supports (animation-timeline: view()) {
    .cover-item {
      animation: cover linear both;
      animation-timeline: view(inline);
    }
  }
}
@keyframes cover {
  0%,
  100% {
    transform: scale(0.92);
  }
  50% {
    transform: scale(1);
  }
}
@media (prefers-reduced-motion: reduce) {
  .cover-item {
    animation: none !important;
  }
}
</style>
