/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⛔ Strict Mode causes React to mount components twice in dev.
  // This breaks Leaflet maps ("Map container is already initialized.")
  reactStrictMode: false,

  // ✅ Remove invalid experimental.serverActions boolean
  // experimental: {
  //   serverActions: false,
  // },

  // You may add future config options here (images, env, etc.)
};

module.exports = nextConfig;
