import { ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteMockServe } from 'vite-plugin-mock'
import * as path from 'path';
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'
export default ({ command }: ConfigEnv) =>{
  const isBuild = command === 'build';

  return {
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
      vue(),
      viteMockServe({
        mockPath: './src/mock',
        localEnabled: !isBuild,
        prodEnabled: false,
      }),
      importToCDN({
        modules: [
          autoComplete('vue'),
          {
            name: 'tailwindcss',
            var: 'tailwindcss',
            path: 'https://www.jsdelivr.com/package/npm/tailwindcss'
          }
        ]
      }),
    ],
    build: {
      assetsDir: './static',
      lib: {
      entry: path.resolve(__dirname, 'lib/main.ts'), // 设置入口文件
      name: 'my-vite-new',
        fileName: (format) => `my-vite-new.${format}.js` // 打包后的文件名
      },
      sourcemap: true, // 输出.map文件
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue'
          }
        }
      }
    },
    esbuild: {
      // 此配置是为了在vue中使用jsx
      jsxFactory: "h",
      jsxFragment: "Fragment",
      jsxInject: "import { h } from 'vue';",
    },
    server: {
        port: 8000, //启动端口
        host: '127.0.0.1',
        open: true,
        hmr: true,
        // 设置 https 代理
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '')
            }
        }
    }
  }
};
