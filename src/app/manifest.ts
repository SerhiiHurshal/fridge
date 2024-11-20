import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    start_url: "/",
    scope: "/",
    name: "Fridge App",
    short_name: "Fridge",
    display: "standalone",
    theme_color: "#fff",
    background_color: "#fff",
    icons: [
      {
        src: "/images/web-app-manifest-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/images/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
