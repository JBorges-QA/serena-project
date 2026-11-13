import type { NextConfig } from "next";

const mode = process.env.NEXT_PUBLIC_BOOKING_MODE === "whatsapp" ? "whatsapp" : "chat";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Cada versão compila em sua própria pasta, permitindo rodar as duas ao mesmo tempo.
  distDir: mode === "whatsapp" ? ".next-whatsapp" : ".next",
};

export default nextConfig;
