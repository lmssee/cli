import { copyFileSync, writeFileSync } from 'node:fs';
import initData from '../initData';
// 项目名称
let name: string;
// 静态测试文件名称
let staticDir: string;

export default () => {
  name = initData.name;
  staticDir = `${name}/static`;

  createTsconfig();

  createViteConfig();

  createPackage();

  createIndexHtml();

  /** 将日志记录放在这里 */
  copyFileSync(`${name}/CHANGELOG.md`, `${staticDir}/CHANGELOG.md`);

  createStaticMainTs();

  createAppTsx();
};

/**  生成 vite config 文件  */
function createViteConfig() {
  writeFileSync(
    `${staticDir}/vite.config.ts`,
    `import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
    plugins: [
        vue(),
        vueJsx()
    ],
});`,
  );
}

/**  生成一个 package.json 文件 */
function createPackage() {
  writeFileSync(
    `${staticDir}/package.json`,
    `{
"name": "static",
"version": "0.0.1",
"main": "index.js",
"type": "module",
"scripts": {
    "dev": "vite"
},
"license": "ISC",
"dependencies": {
    "${name}":  "../library"
    }
}`,
  );
}

/** 生成根 html */
function createIndexHtml() {
  writeFileSync(
    `${staticDir}/index.html`,
    `<!DOCTYPE html>
  <html lang="zh-cn">
    <head>
      <meta charset="UTF-8" />
      <link rel="shortcut icon" type="image/x-icon"  href="./temporary.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${name} 功能测试</title>
    </head>
    <body>
      <div id="app">一定是特别的缘分</div>
      <script src="main.ts" type="module"></script>
    </body>
  </html>
  `,
  );
}

/** 生成 ts config 文件 */
function createTsconfig() {
  writeFileSync(
    `${staticDir}/tsconfig.json`,
    `{
"compilerOptions": {
    "baseUrl": ".",
    "jsx": "preserve",
    "strict": false,
    "target": "ESNext",
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "moduleResolution": "Node",
    "lib": ["ESNext", "DOM"],
    "sourceMap": false
},
"include": [
    "main.ts",
    "app.tsx",
    "**.d.ts",
    "src/**/*.ts",
    "src/**/**/*.ts",
    "src/**/**/*.tsx"
],
"exclude": ["node_modules", "types", "out"]
}`,
  );
}

/** 生成一个 app.tsx 入口文件 */
function createAppTsx() {
  writeFileSync(
    `${staticDir}/app.tsx`,
    `import {defineComponent} from 'vue';
import { TestButton } from '${name}';

export default defineComponent({
    name:"app",
    setup(){
        return ()=> <TestButton onclick="alert('你好！')">
            测试按钮
        </TestButton>
    }
})`,
  );
}
/** 生成 vue 主逻辑文件 */
function createStaticMainTs() {
  writeFileSync(
    `${staticDir}/main.ts`,
    `import { createApp } from "vue";
import App from "./app";
const app = createApp(App);

app.mount("#app");`,
  );
}
