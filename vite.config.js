// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

import react from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://novi//novi-backend-api-wgsgz.ondigitalocean.app',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api')
            }
        }
    }
})