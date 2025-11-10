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
          :src="image"
          :alt="title"
          loading="lazy"
          @load="loaded = true"
          @error="loaded = true"
          class="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-md transition-opacity duration-300"
          :class="loaded ? 'opacity-100' : 'opacity-0'"
        />
      </div>

      <div class="flex-1 flex flex-col">
        <h3
          class="text-base md:text-xl font-semibold text-gray-900 dark:text-gray-100 leading-snug"
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
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        @click="closeModal"
      ></div>

      <!-- Modal Card -->
      <div
        class="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden border border-gray-200 dark:border-gray-700 z-[1000] flex flex-col max-h-[90vh]"
      >
        <!-- Tombol Tutup -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-lg transition"
        >
          <FontAwesomeIcon :icon="['fas', 'xmark']" />
        </button>

        <!-- Hero Image -->
        <div class="w-full h-52 bg-white relative border-b border-gray-300">
          <img
            :src="image"
            :alt="title"
            class="w-full h-full object-contain p-4"
          />
        </div>

        <!-- Content -->
        <div
          class="p-6 overflow-y-auto space-y-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-500"
        >
          <!-- Title -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ title }}
            </h2>
            <p
              class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap"
            >
              {{ description }}
            </p>
          </div>

          <!-- Tech Stack -->
          <div v-if="tech">
            <h3
              class="text-sm font-semibold text-primary dark:text-primary-dark uppercase tracking-wide mb-2"
            >
              Tech Stack
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(item, i) in tech"
                :key="i"
                class="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark font-medium"
              >
                {{ item }}
              </span>
            </div>
          </div>

          <!-- Links -->
          <div v-if="links?.length">
            <h3
              class="text-sm font-semibold text-primary dark:text-primary-dark uppercase tracking-wide mb-2"
            >
              Links
            </h3>
            <ul class="space-y-2">
              <li
                v-for="(item, index) in links"
                :key="index"
                class="flex items-center gap-2 text-sm"
              >
                <FontAwesomeIcon
                  :icon="['fas', 'link']"
                  class="text-primary dark:text-primary-dark"
                />
                <a
                  :href="item.link"
                  target="_blank"
                  rel="noopener"
                  class="hover:underline text-primary dark:text-primary-dark"
                >
                  {{ cleanLink(item.link) }}
                </a>
                <span
                  v-if="item.desc"
                  class="text-gray-500 dark:text-gray-400 text-xs"
                >
                  ({{ item.desc }})
                </span>
              </li>
            </ul>
          </div>

          <!-- Story -->
          <div v-if="story">
            <h3
              class="text-sm font-semibold text-primary dark:text-primary-dark uppercase tracking-wide mb-2"
            >
              Story
            </h3>
            <p
              class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap"
            >
              {{ story }}
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="p-5 border-t border-gray-200 dark:border-gray-700 flex justify-end"
        >
          <button
            @click="closeModal"
            class="px-5 py-2 rounded-md bg-gray-900 dark:bg-white hover:bg-primary/80 dark:hover:bg-gray-200 text-white dark:text-primary text-sm transition-all font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, computed, onUnmounted } from "vue";

const props = defineProps({
  image: String,
  title: String,
  description: String,
  tech: String,
  story: String,
  links: {
    type: Array,
    default: () => [],
  },
});

const loaded = ref(false);
const showModal = ref(false);

function openModal() {
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
}
function cleanLink(url) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

watch(showModal, (value) => {
  if (value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
