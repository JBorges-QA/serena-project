import type { NextConfig } from "next";

const mode = process.env.NEXT_PUBLIC_BOOKING_MODE === "whatsapp" ? "whatsapp" : "chat";
const onNetlify = process.env.NETLIFY === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Localmente, cada versão compila em sua própria pasta para rodar as duas ao mesmo tempo.
  // Na Netlify cada site é um build isolado e o runtime espera a pasta padrão ".next".
  distDir: mode === "whatsapp" && !onNetlify ? ".next-whatsapp" : ".next",
};

export default nextConfig;
