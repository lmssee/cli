import { fileExist } from 'ismi-node-tools';
import { question } from 'ismi-command';
import { mkdirSync, opendirSync, rmSync } from 'node:fs';
/**
 * 判断文件夹是否为空，若不为空询问用户是否覆盖
 */
export default async (pathName: string) => {
  let isCover: boolean = false;
  const fileIsExist = fileExist(pathName);
  // 检测是文件夹是否存在且保证内部没有子文件或文件夹
  if (fileIsExist && fileIsExist.isDirectory()) {
    // 检测文件夹是否为空
    const dir = opendirSync(pathName),
      hasChid = dir.readSync();
    dir.closeSync();
    if (!hasChid) return;
    const tip = ['覆盖', '跳过'];
    const result = (await question({
      text: '文件夹已存在，是否覆盖',
      tip,
    })) as string;
    if (result == tip[1]) {
      console.log('好的，即将为您退出');
      process.exit();
    }
    isCover = true;
    // 覆盖则移除旧的文件
    rmSync(pathName, { maxRetries: 5, recursive: true, retryDelay: 100 });
  }
  mkdirSync(pathName);

  return isCover;
};
