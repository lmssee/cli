import { Args } from "lmcmd";

const command: Args = new Args('lm');

command.bind({
    "init  <-i>  (初始化一个项目)": [
        "vue <v>  (初始化一个 vue 库模版)"
    ],
    "create <-c> (新增一个模块)": [
        "vue  <v>  (新增一个 vue 库模版)"
    ]
}).run();


export default command;