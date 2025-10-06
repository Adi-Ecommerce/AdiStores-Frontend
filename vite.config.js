import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");


    return defineConfig({
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_BACKEND_URL, // proxy backend
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    });
};
