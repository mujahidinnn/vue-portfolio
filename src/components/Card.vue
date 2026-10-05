<template>
  <article class="group relative flex h-full min-w-0 flex-col">
    <div
      class="plate relative overflow-hidden"
      :class="isLogo ? 'bg-paper' : 'bg-background-2'"
      :style="{ aspectRatio }"
    >
      <img
        v-if="thumbnail && !thumbFailed"
        :src="thumbnail"
        :alt="`${title} preview`"
        loading="lazy"
        decoding="async"
        class="absolute inset-0 h-full w-full transition-transform duration-300 ease-out-soft group-hover:scale-[1.03]"
        :class="isLogo ? 'object-contain p-10 sm:p-12' : 'object-cover'"
        @error="thumbFailed = true"
      />
      <!-- Tanpa thumbnail / gagal dimuat: placeholder netral -->
      <span
        v-else
        aria-hidden="true"
        class="absolute inset-0 grid place-items-center bg-background-2 font-display text-6xl text-secondary-2"
      >
        {{ title?.[0] }}
      </span>
    </div>

    <h3 class="mt-6 text-h3 font-semibold text-primary">
      <button
        type="button"
        class="cursor-pointer text-left decoration-accent decoration-1 underline-offset-4 group-hover:underline after:absolute after:inset-0"
        @click="open"
      >
        {{ title }}
      </button>
    </h3>
    <p v-if="systemTags.length" class="note mt-1 truncate">
      {{ systemTags.join(", ") }}
    </p>
    <p class="mt-2 truncate text-base">{{ summary }}</p>
    <p v-if="tech.length" class="note mt-2 truncate font-normal">
      {{ tech.slice(0, MAX_TECH).join(", ") }}
      <template v-if="tech.length > MAX_TECH">
        and {{ tech.length - MAX_TECH }} more
      </template>
    </p>
  </article>

  <!-- Detail karya -->
  <dialog
    ref="dialogEl"
    :aria-label="title"
    class="m-auto max-h-[90dvh] w-[min(56rem,calc(100%-2rem))] overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-card border border-border bg-background text-secondary shadow-soft backdrop:bg-black/60"
    @click.self="close"
    @close="isOpen = false"
  >
    <div v-if="isOpen">
      <div class="pointer-events-none sticky top-0 z-10 -mb-17 flex justify-end p-3">
        <button
          type="button"
          class="pointer-events-auto grid size-11 cursor-pointer place-items-center rounded-card border border-border bg-background text-primary hover:bg-background-2"
          aria-label="Close"
          @click="close"
        >
          <FontAwesomeIcon :icon="['fas', 'xmark']" />
        </button>
      </div>

      <!-- Satu gambar saja: showcase atau logo -->
      <div
        v-if="hasThumb"
        class="border-b border-border"
        :class="isLogo ? 'bg-paper' : 'bg-background-2'"
        :style="isLogo && { aspectRatio }"
      >
        <!-- Showcase mengikuti rasio aslinya (tanpa pita kosong); logo diberi kotak berasio sama dengan kartu -->
        <img
          :src="thumbnail"
          :alt="`${title} preview`"
          decoding="async"
          :class="
            isLogo
              ? 'h-full w-full object-contain p-16 sm:p-24'
              : 'block h-auto w-full'
          "
        />
      </div>

      <div class="space-y-8 p-6 sm:p-10" :class="!hasThumb && 'pt-16'">
        <div>
          <h2 class="display text-h2">{{ title }}</h2>
          <p v-if="systemTags.length" class="note mt-2">
            {{ systemTags.join(", ") }}
          </p>
          <p class="mt-4 max-w-[70ch]">{{ description }}</p>
        </div>

        <div v-if="story">
          <h3 class="mb-3 font-semibold text-primary">The story</h3>
          <p class="max-w-[70ch] border-l border-accent pl-5">{{ story }}</p>
        </div>

        <div v-if="tech.length">
          <h3 class="mb-3 font-semibold text-primary">Tech stack</h3>
          <ul class="flex flex-wrap gap-1.5">
            <li v-for="item in tech" :key="item" class="tag">{{ item }}</li>
          </ul>
        </div>

        <div v-if="links.length">
          <h3 class="mb-1 font-semibold text-primary">Links</h3>
          <ul>
            <li v-for="(item, i) in links" :key="i">
              <a
                :href="item.link"
                target="_blank"
                rel="noreferrer noopener"
                class="link max-w-full"
              >
                <FontAwesomeIcon :icon="['fas', 'link']" class="text-xs" />
                <span class="truncate">{{ cleanLink(item.link) }}</span>
              </a>
              <span v-if="item.desc" class="ml-2 text-small text-secondary-2">
                {{ item.desc }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { track } from "../plugins/plausible";

const MAX_TECH = 4;

// featured & hidden dideklarasikan agar entri JSON bisa di-bind langsung (v-bind="entry")
const props = defineProps({
  thumbnail: String,
  title: String,
  description: String,
  role: String,
  story: String,
  systemTags: { type: Array, default: () => [] },
  tech: { type: Array, default: () => [] },
  links: { type: Array, default: () => [] },
  featured: Boolean,
  hidden: Boolean,
});

// Bukan file showcase = logo, diberi padding agar tidak memenuhi area gambar
const isLogo = !/showcase/i.test(props.thumbnail || "");

// Rasio bingkai = rasio file showcase, supaya gambar tidak terpotong dan tanpa CLS.
// ponytail: rasio ditebak dari folder (portfolios 1200x630, projects 1920x1080);
// tambahkan atribut rasio di JSON bila ukuran showcase mulai beragam.
const aspectRatio = props.thumbnail?.startsWith("/portfolios/")
  ? "1200 / 630"
  : "16 / 9";

// Ringkasan satu baris = kalimat pertama deskripsi
const summary = computed(
  () => props.description?.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? props.description
);

const hasThumb = computed(() => props.thumbnail && !thumbFailed.value);

const thumbFailed = ref(false);
const isOpen = ref(false);
const dialogEl = ref(null);

function open() {
  isOpen.value = true;
  dialogEl.value.showModal();
  track("Project Open", { title: props.title });
}

function close() {
  dialogEl.value.close();
}

function cleanLink(url) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
</script>
