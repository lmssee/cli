import { Args, Color, cursorGetPosition, question, selection } from 'lmcmd';
import type { MyArg } from 'lmcmd/types/src/argTool/auxiliaryData';
import create from 'src/actions/create/create';
import init from 'src/actions/init/init';
import command from 'src/initialization';

// 判断当前是否为结束符，若显示已结束，则没有其他动作，结束进程
command.isEnd.end;

const arg: MyArg = command.getArgs;
const argMap: Record<string, unknown> = arg.$map

// 初始化
if (argMap.init) {
    init(argMap.init);
} else if (argMap.create) {
    // 添加模块
    create(argMap.create);
} else {
    console.log(Color.darkBlack('您未使用任何有效命令').concat(Color.cyan('  可参见下面的命令列表')));
    command.help();
    process.exit();
}





