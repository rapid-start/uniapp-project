import { loadEnv, ConfigEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from "path";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): any => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      },
    },
    server: {
      host: "0.0.0.0",
      port: 8080,
      proxy: (() => {
        let proxy: any = {};
        proxy[env.VITE_APP_PROXY_PRE] = {
          target: env.VITE_APP_PROXY_URL,
          changeOrigin: true
        };
        return proxy;
      })()
    },
    plugins: [
      uni(),
      createHtmlPlugin({
        inject: {
          data: {
            staticUrl: env.VITE_APP_STATIC_URL
          }
        },
      })
    ]
  };
};