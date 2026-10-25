import type { NextConfig } from "next";
const repo = "loopleague-20261025";
const basePath = process.env.GITHUB_ACTIONS ? `/${repo}` : "";
const config: NextConfig = {output: "export", basePath, assetPrefix: basePath, trailingSlash: true, images: {unoptimized: true}};
export default config;
