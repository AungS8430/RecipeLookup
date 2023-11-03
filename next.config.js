/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        mongodb: process.env.MONGODB_URI,
    }
}

module.exports = nextConfig
