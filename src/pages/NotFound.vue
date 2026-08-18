<template>
  <section
    class="py-24 max-w-xl mx-auto text-center px-4 min-h-[calc(100vh_-_68px)] flex flex-col justify-center"
  >
    <h1
      class="text-3xl sm:text-5xl font-bold text-primary dark:text-primary-dark mb-4"
    >
      404
    </h1>
    <p class="text-secondary dark:text-secondary-dark text-sm sm:text-base mb-8">
      Halaman yang kamu cari tidak ditemukan.
    </p>
    <RouterLink
      to="/"
      class="inline-flex items-center gap-2 mx-auto w-max bg-accent dark:bg-accent-dark text-white text-sm sm:text-base font-medium px-5 py-2 rounded-lg shadow-sm transition-all hover:opacity-80 hover:shadow-md"
    >
      Kembali ke Beranda
    </RouterLink>
  </section>
</template>
