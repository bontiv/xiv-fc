/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    distDir: process.env.OUTDIR,
    trailingSlash: true,
    images: { unoptimized: true },
}

module.exports = nextConfig
