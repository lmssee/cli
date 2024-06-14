import { writeJsonFile } from 'ismi-node-tools';
import { writeFileSync } from 'node:fs';

export default (projectName: string) => {
  createTsconfig(projectName);
  // 生成 read me
  writeFileSync(`${projectName}/README.md`, `# ${projectName}`);
  /// 添加热更新
  createMiconfig(projectName);
  // 添加 License 文件
  createLicense(projectName);
  // 添加更新日志
  createChangeLog(projectName);
  // 添加 git ignore
  createGitIgnore(projectName);
};

/// 添加热更新
function createMiconfig(projectName: string) {
  writeFileSync(
    `${projectName}/miconfig.js`,
    `
/**  请勿在函数体外添加非注释内容  */
// 配置项 https://github.com/lmssee/lmhot/blob/main/%E8%87%AA%E8%BF%B0%E6%96%87%E4%BB%B6.md#配置说明
() => ({
    //  热启动相关配置
    hot: {
        // 监听文件的相对路径（这里不影响 \`cwd\` 路径， cwd 依旧相对于配置文件目录 ）
        // "base": "../${projectName}",
        // 监听的文件/夹，但他们内部文件变化，可触发再次启动
        watch: ["library"],
        // 打包编译文件，不监听以下文件内文件变化
        skip: ["out", "types"],
        // 启动 \`code\` 的相对目录，可以为空
        cwd: "static",
        // 执行的具体的命令
        code: "npm run dev",
        // 启动时赋予 \`code\` 的参数
        // args: ["-v"],
        // 监听变化后，相对目录在再次启动前执行的命令
        // 这个属性应与 \`watch\` 元素相同
        beforeRestart: {
            "library": "npm  run build",
        },
    },
});
`,
  );
}

/** 生成 license 文件 */
function createLicense(projectName: string) {
  writeFileSync(
    `${projectName}/LICENSE.md`,
    `Copyright (c) <2024> <${projectName}>
    Permission to use, copy, modify, and/or distribute this software for any  
    purpose with or without fee is hereby granted, provided that the above  
    copyright notice and this permission notice appear in all copies.
    
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES  
    WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF  
    MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR  
    ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES  
    WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN  
    ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF  
    OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
    `,
  );
}

/** 生成 ts config  文件 */
function createTsconfig(projectName: string) {
  const fileData = {
    compilerOptions: {
      baseUrl: '.',
      jsx: 'preserve',
      strict: true,
      target: 'ESNext',
      module: 'ESNext',
      skipLibCheck: true,
      esModuleInterop: true,
      moduleResolution: 'Node',
      lib: ['ESNext', 'DOM'],
      sourceMap: false,
    },
    include: [
      `library/index.ts`,
      './**/**/src/**/*.ts',
      '**.d.ts',
      './**/**/tools/**/*.ts',
      // `${projectName}/shims-vue.d.ts`
    ],
    exclude: ['node_modules'],
  };
  writeJsonFile(`${projectName}/tsconfig.json`, fileData);
}

/*** 生成日志记录文件  */
function createChangeLog(projectName: string) {
  const time = new Date();
  const day = time.getDate(),
    month = time.getMonth() + 1,
    year = time.getFullYear();
  writeFileSync(
    `${projectName}/CHANGELOG.md`,
    `# ${projectName} 

## 0.0.0 (${month} 月 ${day} 日 ${year} 年)

- init this project
`,
  );
}

/** 生成 git ignore 文件 */
function createGitIgnore(projectName: string) {
  writeFileSync(
    `${projectName}/.gitignore`,
    `# dependencies
node_modules

# build file
exportMjs
exportCjs
exportTypes
# mac 
.DS_Store

`,
  );
}
