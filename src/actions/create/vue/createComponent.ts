import { fileExist } from "@lmssee/node-tools";
import { Color, question, t } from "lmcmd";
import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import { basename } from "node:path";

export default async (data: any) => {
    let targetDir;
    if (typeof data == 'string') {
        targetDir = data;
    } else {
        targetDir = await question({
            text: "请输入组件名称",
            tip: "component name",
            private: true
        }) as string;
    }
    // 判断是否是完善的
    const workDir = basename(process.cwd()),
        projectDir = fileExist(workDir),
        srcDir = fileExist(workDir.concat('/src')),
        indexTsDir = fileExist(workDir.concat('/index.ts'));
    if (projectDir && projectDir.isDirectory() && srcDir && srcDir.isDirectory() && indexTsDir && indexTsDir.isFile()) {
        return createNewVueComponent(workDir, targetDir);
    }
    console.log(Color.yellow('项目未初始化或未找到项目地址'));
    process.exit();

}


/** 创建 vue 组件 */
function createNewVueComponent(projectName: string, data: string) {
    data = data.replace(/^\W*|^\s*|^\d*/, "").replace(/\s*/mg, "");
    do {
        data = data.split("-").map((currentEle: string) => /[a-z]/.test(currentEle) ? currentEle.substring(0, 1).toUpperCase().concat(currentEle.substring(1,)) : currentEle).join('')
    } while (data.includes('-'))
    // data = data.replace(/[^a-z]/mg, '');
    const dirName = `${projectName}/src/${data}`;
    mkdirSync(dirName);
    writeFileSync(`${dirName}/${data}.scss`, `.${data}_class {
    position: relative;
    border-radius: 100px;
    width: 100px;
    display: inline-block;
    position: relative;
    color: #0f0;
    background-color: #000;
    top: 0;
    left: 0;
}`);

    // 写入组件的 jsx 文件
    writeFileSync(`${dirName}/${data}.tsx`, `import  {defineComponent} from 'vue';
import './${data}.scss';
    
export default  defineComponent({
    name:"${data}",
    setup(props, ctx) {
        return ()=> ( <button className={'${data}_class'}>测试</button>);
    }
});`);

    // 写入跟文件 
    writeFileSync(`${dirName}/index.ts`, `import { App } from "vue";
import ${data} from "./${data}";
    
${data}.install = function (app: App) {
     app.component(${data}.name as string, ${data});
    return app;
}
 export default ${data};`);

    appendFileSync(`${projectName}/src/index.ts`, `\nexport { default as ${data} } from "./${data}/index";`);
}