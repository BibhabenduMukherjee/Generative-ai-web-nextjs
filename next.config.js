/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["oaidalleapiprodscus.blob.core.windows.net"],
      deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048], // Specify the device sizes for image optimization
      imageSizes: [16, 32, 48, 64, 96], // Specify the image sizes for image optimization
      loader: "default", // Use the default image loader. You can also specify "cloudinary", "imgix", "akamai", or "custom".
      path: "/_next/image", // Set the path for optimized images
    },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "X-Frame-Options",
              value: "SAMEORIGIN",
            },
            {
              key: "X-XSS-Protection",
              value: "1; mode=block",
            },
            
            // Add more security headers as needed
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  