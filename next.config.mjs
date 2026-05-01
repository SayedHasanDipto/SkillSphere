/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "i.pravatar.cc" },
      { hostname: "i.postimg.cc" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
