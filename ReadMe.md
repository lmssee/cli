# @lmssee/cli

A simple Vue UI library construction tool (At least for now, it's like this)

<table><tr>
<td><a href="https://github.com/lmssee/cli/blob/main/ReadMe.md"  target="_self">English</a></td>
<td><a href="https://github.com/lmssee/cli/blob/main/自述文件.md"  target="_self">中文</a></td>
</tr></table>

## install

```sh
npm install  --global  lmssee
```

## use

### create a new project

use you terminal and input :

```sh
npm lmssee  init vue
```

If you install globally, you can also use the following command

```sh
lm  init vue
```

If you have already decided on the name of the project, you can:

```sh
npx lmssee  init <project>
```

If you install globally, you can also use the following command

```sh
lm  init vue <project>
```

If you are lazy, you can use `v` instead of `vue` and use `-i` instead of `init` in the command. That is, the shortest (in the case of global installation) command is

```sh
lm -i v
```

### create a component

```sh
npx lmssee create  vue
```

as `init` , you can use `lm -c v` of you global install

### Supplementary explanation to the working directory

After generating the project, you can `cd <project name>` enter the project root directory, execute `npm install && npm run dev`, and then you can see the initial `test button` component rendering test

The component uses [Vue's jsx](https://cn.vuejs.org/guide/extras/render-function.html) writing style, similar to template writing style

### library ( component's home)

The root directory of the component, which exposes the component to the outside through `index. ts`. The components are located in the `library` folder, and you can add new components by using the command `npx lmssee -c v`.

`The npx lmssee - c v` command will create a new component with the name you entered in the `src` directory (please follow the naming convention for new components, separate words with `-`), and automatically add exports to `library/src/index.ts`. If you want to overwrite the component after writing some code, you can overwrite it again by using the command `npx lmssee - c v<component name>`.

### static

This is a component testing area where you can test newly written components that have just arrived

### about `css`

This project uses the `scss` write `css` style. You can write styles into the `.scss` file under the same name of the component. Because the project was exported as an on-demand export, the `css` was split, but after being packaged with `rollup`, a magical line was generated. The current solution is to manually write references using the `shell` file

If you have any questions, you can directly [submit question](https://github.com/lmssee/cli/issues/new)
