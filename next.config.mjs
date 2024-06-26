/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.weather.gov',
                port: '',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
