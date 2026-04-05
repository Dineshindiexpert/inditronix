/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    domains: ["cdn.jsdelivr.net"],
  },
  output: "standalone",
};

module.exports = nextConfig;
