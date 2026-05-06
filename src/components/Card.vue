<template>
  <!-- Card -->
  <div
    class="group relative p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark shadow-sm hover:scale-[1.01] transition-all duration-300 ease-out flex flex-col justify-between gap-2 @container"
  >
    <div v-if="tech" class="absolute top-3 right-3">
      <button
        @click.stop="openModal"
        class="text-gray-400 hover:text-gray-600 cursor-pointer text-sm transition-all"
      >
        <FontAwesomeIcon :icon="['fas', 'circle-info']" />
      </button>
    </div>

    <div class="flex flex-col @[325px]:flex-row items-start gap-4">
      <div
        class="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 p-2 flex items-center justify-center border border-gray-100 dark:border-gray-800 bg-white rounded-lg"
      >
        <div
          v-if="!loaded"
          class="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"
        ></div>
        <img
          :src="thumbnail"
          :alt="title"
          loading="lazy"
          @load="loaded = true"
          class="w-full h-full object-contain rounded-md transition-opacity duration-300"
          :class="loaded ? 'opacity-100' : 'opacity-0'"
        />
      </div>

      <div class="flex-1 flex flex-col">
        <h3
          class="text-base md:text-xl font-semibold text-gray-900 dark:text-gray-100 leading-snug pr-3"
        >
          {{ title }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
          {{ description }}
        </p>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <transition name="fade">
    <div
      v-if="showModal"
      class="fixed inset-0 z-[999] flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        @click="closeModal"
      ></div>

      <div
        class="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden border border-gray-200 dark:border-gray-700 z-[1000] flex flex-col max-h-[90vh]"
      >
        <button
          @click="closeModal"
          class="absolute top-4 right-4 z-10 bg-white/80 dark:bg-black/50 w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:scale-110 transition"
        >
          <FontAwesomeIcon :icon="['fas', 'xmark']" />
        </button>

        <div
          class="w-full h-64 sm:h-80 bg-gray-50 dark:bg-gray-800 relative group/slider border-b border-gray-200 dark:border-gray-700"
        >
          <div class="w-full h-full flex items-center justify-center">
            <img
              :src="currentGalleryImage.src"
              :alt="currentGalleryImage.alt"
              class="max-w-full max-h-full object-contain transition-all duration-500"
            />
          </div>

          <template v-if="images && images.length > 1">
            <button
              @click="prevSlide"
              class="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition"
            >
              <FontAwesomeIcon :icon="['fas', 'chevron-left']" />
            </button>
            <button
              @click="nextSlide"
              class="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition"
            >
              <FontAwesomeIcon :icon="['fas', 'chevron-right']" />
            </button>

            <!-- Pagination Dots -->
            <div
              class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5"
            >
              <span
                v-for="(_, index) in images"
                :key="index"
                @click="activeIndex = index"
                class="w-2 h-2 rounded-full cursor-pointer transition-all"
                :class="
                  activeIndex === index ? 'bg-primary w-4' : 'bg-gray-400/50'
                "
              ></span>
            </div>
          </template>
        </div>

        <!-- Content Section -->
        <div class="p-6 overflow-y-auto space-y-6 custom-scrollbar">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ title }}
            </h2>
            <p
              class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-2"
            >
              {{ description }}
            </p>
          </div>

          <!-- Tech Stack -->
          <div v-if="tech.length">
            <h3
              class="text-xs font-bold text-primary dark:text-primary-dark uppercase tracking-widest mb-3"
            >
              Tech Stack
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in tech"
                :key="item"
                class="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark font-medium border border-primary/10"
              >
                {{ item }}
              </span>
            </div>
          </div>

          <!-- Links -->
          <div v-if="links?.length">
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
                <FontAwesomeIcon :icon="['fas', 'link']" class="text-xs" />
                <span>{{ cleanLink(item.link) }}</span>
                <span v-if="item.desc" class="text-gray-400 text-xs italic"
                  >- {{ item.desc }}</span
                >
              </a>
            </div>
          </div>

          <!-- Story -->
          <div v-if="story">
            <h3
              class="text-xs font-bold text-primary dark:text-primary-dark uppercase tracking-widest mb-3"
            >
              The Story
            </h3>
            <p
              class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-primary-dark/20 pl-4"
            >
              {{ story }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, computed, onUnmounted } from "vue";

const props = defineProps({
  thumbnail: String,
  images: Array,
  title: String,
  description: String,
  tech: { type: Array, default: () => [] },
  story: String,
  links: { type: Array, default: () => [] },
});

const loaded = ref(false);
const showModal = ref(false);
const activeIndex = ref(0);

const currentGalleryImage = computed(() => {
  if (props.images && props.images.length > 0) {
    return props.images[activeIndex.value];
  }
  return { src: props.image, alt: props.title };
});

function nextSlide() {
  activeIndex.value = (activeIndex.value + 1) % props.images.length;
}

function prevSlide() {
  activeIndex.value =
    activeIndex.value === 0 ? props.images.length - 1 : activeIndex.value - 1;
}

function openModal() {
  showModal.value = true;
  activeIndex.value = 0;
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
