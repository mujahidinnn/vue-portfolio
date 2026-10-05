<template>
  <section id="contact" class="wrap pt-8 lg:pt-20">
    <h1 class="display max-w-[14ch] text-h1">
      Let's build something great.
    </h1>
    <p class="mt-5 max-w-[34rem]">
      Looking for a coding partner, a new opportunity, or just want to say
      hello? Pick a channel below and reach out.
    </p>

    <!-- Salin email -->
    <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
      <a
        :href="`mailto:${email}`"
        class="display inline-flex min-h-11 items-center text-[clamp(1.375rem,0.9rem+2.2vw,2.75rem)] hover:text-accent"
      >
        {{ email }}
      </a>
      <button type="button" class="btn btn-secondary" @click="copyEmail">
        <span aria-live="polite">{{ copied ? "Copied" : "Copy email" }}</span>
      </button>
    </div>

    <!-- Kanal -->
    <div class="ruler mt-12 max-w-[45rem]" aria-hidden="true"></div>
    <ul class="max-w-[45rem]">
      <li
        v-for="channel in channels"
        :key="channel.label"
        class="border-b border-border"
      >
        <a
          :href="channel.href"
          :target="channel.href.startsWith('http') ? '_blank' : undefined"
          rel="noreferrer noopener"
          class="group flex min-h-18 items-center gap-4 py-3"
        >
          <FontAwesomeIcon
            :icon="channel.icon"
            class="w-5 text-secondary-2 group-hover:text-accent"
          />
          <span class="min-w-0 flex-1">
            <span class="block font-semibold text-primary decoration-accent decoration-1 underline-offset-4 group-hover:underline">
              {{ channel.label }}
            </span>
            <span class="block truncate text-[0.9375rem] text-secondary-2">
              {{ channel.handle }}
            </span>
          </span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { channels, email } from "../site";

const copied = ref(false);

async function copyEmail() {
  await navigator.clipboard.writeText(email);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}
</script>
