import { Color, question } from "lmcmd";
import dirIsExist from "../../tools/dirIsExist";
import initVue from "./vue/initVue";
import command from "src/initialization";
import initData from "./initData";

/** 初始化配置   */
export default async (data: { [key in string]?: unknown }) => {
    if (data.vue) {
        let projectName: string;
        if (typeof data.vue !== 'string') {
            // 获取用户想创建的用户名称
            projectName = await question({
                text: "请问您的项目名称",
                tip: "请使用英文字母",
                private: true
            }) as string;
        } else projectName = data.vue;
        initData.name = projectName;
        // 创建项目前的处理工作，若文件夹存在不为空，且用户禁止覆盖直接在方法退出程序
        await dirIsExist(projectName);
        await initVue();
    } else {
        console.log(Color.darkCyan('命令无法理解，即将退出，您可以参看以下命令'));
        command.help('init');
        process.exit();
    }
};