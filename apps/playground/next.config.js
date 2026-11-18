// Path: apps/playground/next.config.js

/** @type {import('next').Next.jsConfig} */
const nextConfig = {
  output: 'export', // 开启静态导出，生成 out 目录供 Cloudflare Pages 托管
  reactStrictMode: true,
  images: {
    unoptimized: true, // 静态导出时关闭默认图片优化，适配边缘静态托管
  },
};

module.exports = nextConfig;
