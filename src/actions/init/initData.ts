import {
  initializeFile,
  getDirectoryBy,
  readFileToJsonSync,
  pathJoin,
} from 'ismi-node-tools';

/** 获取当前工作目录 */
const [__dirname] = initializeFile();
// 获取根
let cwd = getDirectoryBy('package.json', 'file', __dirname);
if (cwd == undefined) {
  cwd = process.cwd();
}
// 获取
const ismiJSTools = readFileToJsonSync(pathJoin(cwd, 'package.json'))
  .dependencies['ismi-js-tools'];

export default {
  /** 项目名称 */
  name: '',
  /** 依赖版本管理 */
  dependencies: {
    'ismi-js-tools': ismiJSTools,
  },
};
