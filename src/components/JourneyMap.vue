<template>
  <!-- Peta kecil: garis pantai Jawa + rute antar kota -->
  <figure>
    <div class="relative">
      <svg
        :viewBox="`0 0 ${java.width} ${java.height}`"
        class="block h-auto w-full"
        role="img"
        :aria-label="`Map of Java showing ${stops.map((s) => s.city).join(', ')}`"
      >
        <path
          :d="java.d"
          class="fill-background stroke-primary"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
        <polyline
          :points="route"
          class="fill-none stroke-accent"
          stroke-width="1"
          stroke-dasharray="4 3"
          vector-effect="non-scaling-stroke"
        />
      </svg>
      <span
        v-for="stop in mapped"
        :key="stop.city"
        class="absolute size-2 -translate-x-1/2 -translate-y-1/2 bg-accent ring-1 ring-background"
        :style="{ left: `${stop.left}%`, top: `${stop.top}%` }"
      ></span>
    </div>
  </figure>
</template>

<script setup>
import java from "../data/java-outline.json";
import workExperiences from "../data/work-experiences.json";
import educations from "../data/educations.json";

// Koordinat kota. Kota baru di JSON tetap masuk daftar; tambahkan di sini supaya juga muncul di peta.
const CITIES = {
  Tegal: { lon: 109.14, lat: -6.87 },
  Yogyakarta: { lon: 110.37, lat: -7.8 },
  Klaten: { lon: 110.61, lat: -7.71 },
  Jakarta: { lon: 106.85, lat: -6.21 },
};

// Kelompokkan pengalaman & pendidikan per kota, urut dari yang paling awal
const byCity = {};
for (const entry of [...educations, ...workExperiences]) {
  const city = entry.location.split(",")[0].trim();
  const years = entry.period.match(/\d{4}/g).map(Number);
  const stop = (byCity[city] ??= { city, from: Infinity });
  stop.from = Math.min(stop.from, ...years);
}
const stops = Object.values(byCity).sort((a, b) => a.from - b.from);

const mapped = stops
  .filter((stop) => CITIES[stop.city])
  .map((stop) => {
    const { lon, lat } = CITIES[stop.city];
    const x = (lon - java.lon0) * java.kx;
    const y = (java.lat0 - lat) * java.ky;
    return {
      ...stop,
      x,
      y,
      left: (x / java.width) * 100,
      top: (y / java.height) * 100,
    };
  });

const route = mapped.map((stop) => `${stop.x.toFixed(1)},${stop.y.toFixed(1)}`).join(" ");
</script>
