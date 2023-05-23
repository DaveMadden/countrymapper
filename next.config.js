/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  webpack(config, options) {
    if (options.isServer) config.devtool = "source-map";
    return config;
  },
};
// module.exports = nextConfig
