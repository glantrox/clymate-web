import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BASE_URL_WEATHER_API: process.env.BASE_URL_WEATHER_API,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  }
};

export default nextConfig;
