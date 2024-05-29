import { fileExist } from "@lmssee/node-tools";
import { Color, question, t } from "lmcmd";
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename } from "node:path";
import createData from "../createData";
import command from "src/initialization";
import dirIsExist from "src/tools/dirIsExist";


/** 创建一个组件 */
export default async (data: any) => {
    let targetDir;

    // 判断是否是完善的路径
    const workDir = basename(process.cwd()),
        libraryDir = fileExist('library'),
        srcDir = fileExist('library/src'),
        indexTsDir = fileExist('library/index.ts');

    if (libraryDir && libraryDir.isDirectory() && srcDir && srcDir.isDirectory() && indexTsDir && indexTsDir.isFile()) {
        if (typeof data == 'string') {
            targetDir = data;
        } else {
            targetDir = await question({
                text: "请输入组件名称",
                tip: "component name",
                private: true
            }) as string;
        }
        createData.targetName = targetDir;
        createData.name = workDir;
        return createNewVueComponent();
    }
    console.log(Color.yellow('项目未初始化（可参见下面的初始化方法）或未找到项目地址'));
    console.log(command.help('init'));
    process.exit();

}


/** 创建 vue 组件 */
async function createNewVueComponent() {
    /** 新增组件名称 */
    const { targetName, targetDir, className } = createData;
    mkdirSync(targetDir);
    /** 写入样式 */
    writeFileSync(`${targetDir}/${targetName}.scss`, `.${className}_class {
    position: relative;
    border-radius: 24px 8px;
    width: 100px;
    display: inline-block;
    position: relative;
    color: #0f0;
    background-color: #000;
    top: 0;
    left: 0;
    transition: all 1s;

    &:hover {
        transition: all 1s;
        border-radius: 8px 24px;
        color: #000;
        background-color: #fff;
    }
}`);

    // 写入组件的 jsx 文件
    writeFileSync(`${targetDir}/${targetName}.tsx`, `import  {defineComponent} from 'vue';
import { App } from "vue";
import './${targetName}.scss';
 
/**  组件 ${targetName} 内容部分   */
const ${targetName}  =  defineComponent({
    name:"${targetName}",
    setup(props, ctx) {
        return ()=> ( <button className={'${className}_class'}>测试</button>);
    }
});

${targetName}.install = function (app: App) {
    app.component(${targetName}.name as string, ${targetName});
    return app;
  };
  
export { ${targetName} };
`);

    /// 添加 ts 导出到 index.ts
    const indexFileName = `library/src/index.ts`;
    const appendExportStr = `export {  ${targetName} } from "./${targetName}/${targetName}";`
    if (readFileSync(indexFileName).toString().indexOf(appendExportStr) == -1)
        appendFileSync(indexFileName, '\n'.concat(appendExportStr));
}