import type { NextConfig } from "next";

const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // URL del endpoint de suscripción (subscribe.php se sirve desde la raíz del
  // sitio, así que respeta el basePath del despliegue).
  env: { NEXT_PUBLIC_SUBSCRIBE_URL: `${basePath}/subscribe.php` },
};

export default nextConfig;
