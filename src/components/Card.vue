<template>
  <div
    @click="openModal"
    class="group relative rounded-xl sm:rounded-2xl border border-white/70 dark:border-gray-800 bg-white dark:bg-background-dark backdrop-blur-md dark:backdrop-blur-none shadow-lg shadow-accent/10 dark:shadow-none hover:shadow-xl hover:shadow-accent/20 dark:hover:shadow-accent-dark/10 hover:border-accent/40 dark:hover:border-accent-dark/40 hover:bg-white/80 dark:hover:bg-background-dark hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col @container cursor-pointer overflow-hidden"
  >
    <div
      class="relative w-full aspect-[16/9] overflow-hidden border-b border-gray-100 dark:border-gray-800"
      :class="isLogo ? 'bg-white' : 'bg-gray-50 dark:bg-gray-800'"
    >
      <div
        v-if="!loaded"
        class="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700"
      ></div>
      <img
        :src="getSrc(thumbnail, false)"
        :alt="title"
        loading="lazy"
        @load="loaded = true"
        @error="handleImageError(thumbnail, false)"
        class="absolute inset-0 w-full h-full transition-transform duration-300"
        :class="[
          loaded ? 'opacity-100' : 'opacity-0',
          isLogo ? 'object-contain p-10 sm:p-12' : 'object-cover',
        ]"
      />
    </div>

    <!-- Wrapper untuk Konten Teks -->
    <div class="flex-1 flex flex-col gap-4 p-4 sm:p-6 pt-5">
      <div class="flex flex-col @[325px]:flex-row items-start gap-4">
        <div class="flex-1 flex flex-col min-w-0">
          <h3
            class="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 leading-snug pr-3 group-hover:text-accent dark:group-hover:text-accent-dark transition-colors"
          >
            {{ title }}
          </h3>
          <p
            class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2"
          >
            {{ description }}
          </p>
        </div>
      </div>

      <div
        v-if="systemTags && systemTags.length"
        ref="tagsEl"
        class="relative flex overflow-hidden gap-1"
      >
        <span
          v-for="(tag, i) in systemTags"
          :key="tag"
          data-chip
          class="inline-flex shrink-0 first:shrink first:min-w-0 first:overflow-hidden items-center gap-1 px-2 py-0.5 text-[9px] sm:text-[10px] whitespace-nowrap rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 font-semibold uppercase tracking-wide"
          :class="i >= tagCount && 'absolute invisible'"
        >
          <FontAwesomeIcon
            :icon="['fas', 'hashtag']"
            class="text-[8px] sm:text-[9px]"
          />
          {{ tag }}
        </span>
        <span
          v-if="systemTags.length > tagCount"
          class="shrink-0 px-2 py-0.5 text-[9px] sm:text-[10px] rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 font-semibold"
        >
          +{{ systemTags.length - tagCount }}
        </span>
      </div>

      <div
        v-if="tech && tech.length"
        ref="techEl"
        class="relative flex overflow-hidden gap-1.5"
      >
        <span
          v-for="(item, i) in tech"
          :key="item"
          data-chip
          class="shrink-0 first:shrink first:min-w-0 first:overflow-hidden px-2 py-0.5 text-[10px] sm:text-xs whitespace-nowrap rounded-full bg-accent/8 text-accent dark:bg-accent-dark/15 dark:text-accent-dark border border-accent/15 dark:border-accent-dark/20 font-medium"
          :class="i >= techCount && 'absolute invisible'"
        >
          {{ item }}
        </span>
        <span
          v-if="tech.length > techCount"
          class="shrink-0 px-2 py-0.5 text-[10px] sm:text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium"
        >
          +{{ tech.length - techCount }}
        </span>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-[999] flex items-center justify-center p-4"
      >
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="closeModal"
        ></div>

        <!-- max-w-2xl diubah menjadi max-w-4xl agar modal lebih besar -->
        <div
          class="relative bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-gray-200 dark:border-gray-700 z-[1000] flex flex-col max-h-[90vh]"
        >
          <button
            @click="closeModal"
            class="absolute top-4 right-4 z-10 bg-white/80 dark:bg-black/50 w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 cursor-pointer shadow-md hover:bg-white dark:hover:bg-black transition"
          >
            <FontAwesomeIcon :icon="['fas', 'xmark']" />
          </button>

          <!-- Modal Image Container -->
          <div
            class="w-full aspect-[16/9] relative border-b border-gray-200 dark:border-gray-700 overflow-hidden"
            :class="isLogo ? 'bg-white' : 'bg-gray-50 dark:bg-gray-800'"
          >
            <div
              class="w-full h-full flex items-center justify-center relative"
            >
              <div
                v-if="!modalImageLoaded"
                class="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700"
              ></div>

              <img
                :src="getSrc(thumbnail, true)"
                :alt="title"
                @load="modalImageLoaded = true"
                @error="handleImageError(thumbnail, true)"
                class="w-full h-full object-contain transition-all duration-300"
                :class="[
                  modalImageLoaded ? 'opacity-100' : 'opacity-0',
                  isLogo && 'p-16 sm:p-24',
                ]"
              />
            </div>
          </div>

          <div
            class="p-6 sm:p-8 overflow-y-auto space-y-5 sm:space-y-6 custom-scrollbar"
          >
            <div>
              <h2
                class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100"
              >
                {{ title }}
              </h2>
              <span
                v-if="role"
                class="inline-block w-fit mt-2 px-3 py-1 text-xs rounded-full bg-accent/10 text-accent dark:bg-accent-dark/15 dark:text-accent-dark font-medium"
              >
                {{ role }}
              </span>
              <p
                class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-3"
              >
                {{ description }}
              </p>
              <div
                v-if="systemTags && systemTags.length"
                class="flex flex-wrap gap-2 mt-4"
              >
                <span
                  v-for="tag in systemTags"
                  :key="tag"
                  class="inline-flex items-center gap-1.5 w-fit px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 font-semibold uppercase tracking-wide"
                >
                  <FontAwesomeIcon
                    :icon="['fas', 'hashtag']"
                    class="text-[10px]"
                  />
                  {{ tag }}
                </span>
              </div>
            </div>

            <div v-if="tech && tech.length">
              <h3
                class="text-xs font-bold text-primary dark:text-primary-dark uppercase tracking-widest mb-3"
              >
                Tech Stack
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="item in tech"
                  :key="item"
                  class="px-3 py-1 text-xs rounded-full bg-accent/8 text-accent dark:bg-accent-dark/15 dark:text-accent-dark font-medium border border-accent/15 dark:border-accent-dark/20"
                >
                  {{ item }}
                </span>
              </div>
            </div>

            <div v-if="links && links.length">
              <h3
                class="text-xs font-bold text-primary dark:text-primary-dark uppercase tracking-widest mb-3"
              >
                Project Links
              </h3>
              <div class="flex flex-col gap-2">
                <a
                  v-for="(item, i) in links"
                  :key="i"
                  :href="item.link"
                  target="_blank"
                  class="flex items-center gap-2 text-sm text-primary dark:text-primary-dark hover:underline group"
                >
                  <FontAwesomeIcon :icon="['fas', 'link']" />
                  <span>{{ cleanLink(item.link) }}</span>
                  <span v-if="item.desc" class="text-gray-400 text-xs italic"
                    >- {{ item.desc }}</span
                  >
                </a>
              </div>
            </div>

            <div v-if="story">
              <h3
                class="text-xs font-bold text-primary dark:text-primary-dark uppercase tracking-widest mb-3"
              >
                The Story
              </h3>
              <p
                class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-primary-dark/20 pl-4"
              >
                {{ story }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  thumbnail: String,
  title: String,
  description: String,
  role: String,
  systemTags: { type: Array, default: () => [] },
  tech: { type: Array, default: () => [] },
  story: String,
  links: { type: Array, default: () => [] },
});

// Bukan file showcase = logo, diberi padding agar tidak memenuhi area gambar
const isLogo = !/showcase/i.test(props.thumbnail || "");

// Hitung berapa chip yang muat dalam satu baris, sisanya diringkas jadi +N
const MORE_WIDTH = 36; // ruang untuk badge +N

function useFit(gap) {
  const el = ref(null);
  const count = ref(Infinity);
  let observer;

  function fit() {
    if (!el.value) return;
    const chips = el.value.querySelectorAll("[data-chip]");
    const max = el.value.clientWidth;
    let used = 0;
    let n = 0;
    for (const chip of chips) {
      // scrollWidth: lebar asli chip pertama yang bisa menyusut (first:shrink)
      const natural = chip.scrollWidth + chip.offsetWidth - chip.clientWidth;
      const width = natural + (n ? gap : 0);
      const reserve = n === chips.length - 1 ? 0 : MORE_WIDTH + gap;
      if (used + width + reserve > max) break;
      used += width;
      n++;
    }
    count.value = Math.max(n, 1);
  }

  onMounted(() => {
    if (!el.value) return;
    observer = new ResizeObserver(fit);
    observer.observe(el.value);
    document.fonts?.ready.then(fit);
  });
  onUnmounted(() => observer?.disconnect());

  return { el, count };
}

const { el: tagsEl, count: tagCount } = useFit(4);
const { el: techEl, count: techCount } = useFit(6);

const loaded = ref(false);
const modalImageLoaded = ref(false);
const showModal = ref(false);

// --- FALLBACK LOGIC ---
const failedExts = ref({});

function changeExt(url, newExt) {
  if (!url) return "";
  return url.replace(/\.[^/.]+$/, `.${newExt}`);
}

function getSrc(originalUrl, isModal = false) {
  const fallbackPlaceholder = isModal
    ? "https://placehold.co/1280x720?text=No+Preview"
    : "https://placehold.co/1280x720?text=No+Image";

  if (!originalUrl) return fallbackPlaceholder;

  const fails = failedExts.value[originalUrl] || [];

  if (fails.includes("all")) return fallbackPlaceholder;
  if (!fails.includes("avif")) return changeExt(originalUrl, "avif");
  if (!fails.includes("webp")) return changeExt(originalUrl, "webp");

  return originalUrl;
}

function handleImageError(originalUrl, isModal) {
  if (!failedExts.value[originalUrl]) {
    failedExts.value[originalUrl] = [];
  }

  const fails = failedExts.value[originalUrl];

  if (fails.includes("all")) return;

  if (!fails.includes("avif")) {
    fails.push("avif");
  } else if (!fails.includes("webp")) {
    fails.push("webp");
  } else {
    fails.push("all");
    if (isModal) {
      modalImageLoaded.value = true;
    } else {
      loaded.value = true;
    }
  }

  failedExts.value = { ...failedExts.value };
}
// ----------------------

function openModal() {
  showModal.value = true;
  modalImageLoaded.value = false;
}

function closeModal() {
  showModal.value = false;
}

function cleanLink(url) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

watch(showModal, (value) => {
  document.body.style.overflow = value ? "hidden" : "";
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151;
}
</style>
