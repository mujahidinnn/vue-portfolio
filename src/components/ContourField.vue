<template>
  <svg
    :viewBox="viewBox"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    class="pointer-events-none absolute"
  >
    <path
      v-for="(d, i) in paths"
      :key="i"
      :d="d"
      class="contour"
      :class="i % 4 === 0 && i >= FADE_LINES && 'contour-index'"
      :style="{ '--i': i, '--fade': Math.min(1, FADE_MIN + ((1 - FADE_MIN) * i) / FADE_LINES) }"
    />
  </svg>
</template>

<script>
// Garis kontur dari medan buatan (beberapa bukit gaussian), dihitung sekali
// dengan marching squares sehingga garis tidak pernah saling berpotongan.
// viewBox dibuat lebih luas dari bukitnya: setiap garis berupa lingkar tertutup,
// jadi tidak ada garis yang terpotong di tepi. Ukuran & posisi diatur pemakai lewat class.
const X0 = 0;
const Y0 = -300;
const W = 1500;
const H = 1300;
const STEP = 10;
// [x, y, radius, tinggi]
const PEAKS = [
  [880, 300, 250, 1],
  [1090, 580, 170, 0.7],
  [640, 110, 150, 0.5],
  [1000, 40, 130, 0.45],
];
// Beberapa garis terluar (level terendah) makin pudar ke arah luar
const FADE_LINES = 3;
// Garis paling luar tetap terlihat (tidak pudar sampai hilang), supaya batas luar terbaca jelas
const FADE_MIN = 0.45;
// Level terendah 0.3 menentukan batas luar kontur; naikkan untuk mengecilkan areanya
const LEVELS = Array.from({ length: 11 }, (_, i) => 0.3 + i * 0.08);

const height = (x, y) =>
  PEAKS.reduce(
    (sum, [px, py, r, a]) =>
      sum + a * Math.exp(-((x - px) ** 2 + (y - py) ** 2) / (2 * r * r)),
    0
  ) +
  0.05 * Math.sin(x / 90) * Math.cos(y / 70);

function contour(level) {
  let d = "";
  for (let y = Y0; y < Y0 + H; y += STEP) {
    for (let x = X0; x < X0 + W; x += STEP) {
      // sudut sel searah jarum jam: kiri-atas, kanan-atas, kanan-bawah, kiri-bawah
      const corners = [
        [x, y],
        [x + STEP, y],
        [x + STEP, y + STEP],
        [x, y + STEP],
      ].map(([cx, cy]) => [cx, cy, height(cx, cy)]);
      const points = [];
      for (let e = 0; e < 4; e++) {
        const [x1, y1, v1] = corners[e];
        const [x2, y2, v2] = corners[(e + 1) % 4];
        if (v1 < level === v2 < level) continue;
        const t = (level - v1) / (v2 - v1);
        points.push(
          `${(x1 + t * (x2 - x1)).toFixed(1)} ${(y1 + t * (y2 - y1)).toFixed(1)}`
        );
      }
      for (let p = 0; p + 1 < points.length; p += 2)
        d += `M${points[p]}L${points[p + 1]}`;
    }
  }
  return d;
}

const paths = LEVELS.map(contour);

export default {
  setup: () => ({
    viewBox: `${X0} ${Y0} ${W} ${H}`,
    paths,
    FADE_LINES,
    FADE_MIN,
  }),
};
</script>
