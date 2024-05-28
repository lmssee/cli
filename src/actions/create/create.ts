import { Color } from "lmcmd";
import createComponent from "./vue/createComponent";
import command from "../../initialization";

export default async (data: { [key in string]?: unknown }) => {
    if (data.vue) {
        await createComponent(data.vue)
    } else {
        console.log(Color.darkCyan('命令无法理解，即将退出，您可以参看以下命令'));
        command.help('create');
        process.exit();
    }

}

