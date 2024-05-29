
let data = "";

export default {
    /** 库名称 */
    name: "",
    /** 新增组件名称 */
    set targetName(value: string) {
        data = value.replace(/^\W*|^\s*|^\d*/, "").replace(/\s*/mg, "");
        this.className = data.replace(/\-/mg, "_");
        do {
            data = data.split("-").map((currentEle: string) => /[a-z]/.test(currentEle) ? currentEle.substring(0, 1).toUpperCase().concat(currentEle.substring(1,)) : currentEle).join('')
        } while (data.includes('-'))
    },
    get targetName() {
        return data;
    },

    /** class name  */
    className: "",
    /** 组件的目录位置 */
    get targetDir(): string {
        return `library/src/${data}`;
    }
}