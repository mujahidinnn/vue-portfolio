import type { ViteSSGOptions } from "vite-ssg";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { origin, pages } from "./src/seo";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  ssgOptions: <ViteSSGOptions>{
    dirStyle: "nested",
    // Isi title/description/canonical per halaman ke HTML statis
    onPageRendered(route: string, html: string) {
      const page = pages[route];
      if (!page) return html;
      const url = `${origin}${route}`;
      return html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
        .replace(/(<meta\s+name="description"\s+content=")[^"]*"/, `$1${esc(page.description)}"`)
        .replace(/(<meta\s+property="og:url"\s+content=")[^"]*"/, `$1${url}"`)
        .replace("</head>", `<link rel="canonical" href="${url}" /></head>`);
    },
  },
});
