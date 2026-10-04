import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RZTrack - Personal Finance",
    short_name: "RZTrack",
    description: "Kelola transaksi, dompet, anggaran, dan target keuangan.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#f7f8fc",
    theme_color: "#111827",
    orientation: "portrait-primary",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ]
  };
}
