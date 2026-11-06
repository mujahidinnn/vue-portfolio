export const origin = "https://mujahidin.my.id";

export const pages: Record<
  string,
  { title: string; description: string; robots?: string }
> = {
  "/": {
    title:
      "Mujahidin | Frontend Web Developer | React, Next.js, Vue.js, Nuxt.js & WebGIS",
    description:
      "Mujahidin is a Frontend (FE) Web Developer based in Jakarta, Indonesia with 4+ years building React & Vue.js admin dashboards and WebGIS / geospatial applications.",
  },
  "/about": {
    title: "About Mujahidin | Frontend Web Developer",
    description:
      "Learn more about Mujahidin, a frontend developer specializing in React, Vue.js, and WebGIS, plus the tools and stack used to build production web applications.",
  },
  "/portfolios": {
    title: "Portfolio | Mujahidin | Frontend Web Developer",
    description:
      "Explore Mujahidin's portfolio of admin dashboards, management systems, and geospatial web applications built with React, Vue.js, Next.js, and WebGIS tools.",
  },
  "/projects": {
    title: "Projects | Mujahidin | Frontend Web Developer",
    description:
      "Browse projects built by Mujahidin, including government and enterprise platforms using React, Vue.js, Next.js, Leaflet, and Django.",
  },
  "/contact": {
    title: "Contact Mujahidin | Frontend Web Developer",
    description:
      "Get in touch with Mujahidin for frontend development opportunities and collaboration via email, LinkedIn, GitHub, or Instagram.",
  },
};

export const notFound = {
  title: "Page Not Found | Mujahidin",
  description: "The page you're looking for doesn't exist.",
  robots: "noindex, follow",
};
