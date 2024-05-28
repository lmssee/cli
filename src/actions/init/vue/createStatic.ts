import { writeJsonFile } from "@lmssee/node-tools";
import { copyFileSync, writeFileSync } from "node:fs"

export default (projectName: string) => {
    createTsconfig(projectName);

    createViteConfig(projectName);

    createPackage(projectName);

    createIndexHtml(projectName);

    copyFileSync(`${projectName}/CHANGELOG.md`, `${projectName}/static/CHANGELOG.md`);


    createStaticMainTs(projectName);

    createAppTsx(projectName);
}


function createViteConfig(projectName: string) {
    writeFileSync(`${projectName}/static/vite.config.ts`, `import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
    plugins: [
        vue(),
        vueJsx()
    ],
});`)
}

function createPackage(projectName: string) {
    writeFileSync(`${projectName}/static/package.json`, `{
"name": "static",
"version": "0.0.1",
"main": "index.js",
"type": "module",
"scripts": {
    "dev": "vite"
},
"license": "ISC",
"dependencies": {
    "@lmssee/tools": "0.0.12",
    "${projectName}":  "../${projectName}"
    }
}`
    )
}

function createIndexHtml(projectName: string) {
    writeFileSync(`${projectName}/static/index.html`, `<!DOCTYPE html>
  <html lang="zh-cn">
    <head>
      <meta charset="UTF-8" />
      <link rel="shortcut icon" type="image/x-icon"  href="./public/temporary.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>功能测试</title>
    </head>
    <body>
      <div id="app">一定是特别的缘分</div>
      <script src="main.ts" type="module"></script>
    </body>
  </html>
  `);
}

function createTsconfig(projectName: string) {
    writeFileSync(`${projectName}/static/tsconfig.json`, `{
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
}`)
}

function createAppTsx(projectName: string) {
    writeFileSync(`${projectName}/static/app.tsx`, `import {defineComponent} from 'vue';
import { TestButton } from '../${projectName}';

export default defineComponent({
    name:"app",
    setup(){
        return ()=> <TestButton onclick="alert('你好！')">
            测试按钮
        </TestButton>
    }
})`);
}
function createStaticMainTs(projectName: string) {
    writeFileSync(`${projectName}/static/main.ts`, `import { createApp } from "vue";
import App from "./app";
const app = createApp(App);

app.mount("#app");`)
}

