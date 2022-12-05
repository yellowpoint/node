参考此项目[从零搭建一个前端 cli 脚手架并发布到 npm](https://segmentfault.com/a/1190000040719719)

# 过程

1. npm init -y
2. npm install chalk commander download-git-repo inquirer ora log-symbols
3. 此时我们执行 npm link 将命令挂载到全局，然后再输入 cm 就可以到达刚才 node ./bin/cm 的效果了。

- 报错 ENOENT: no such file or directory, rename '/Users/huangdian/Documents/yellowpoint/github/node/cli/1-demo/node_modules/_got@8.3.2@got/node_modules/pify' -> '/Users/huangdian/Documents/yellowpoint/github/node/cli/1-demo/node_modules/_npm-conf@1.1.3@npm-conf/node_modules/pify'

# 报错

- Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: /Users/huangdian/Documents/yellowpoint/github/node/cli/1-demo/node_modules/_inquirer@9.1.4@inquirer/lib/inquirer.js
  - inquirer 得降到 8，
  - https://github.com/SBoudrias/Inquirer.js/issues/999
  - log-symbols 也得降到 4
- node 啥版本支持了 import？

# 设计

1. 输入业务单元名字
   1. 创建对应文件件
   2. 下载模板
   3. 替换文件中对应的业务单元名字
2. 列出还要做的 todo 列表
   1. 检测文件修改，自动打钩
   2.

# 问题

1. monorepo 仓库如何调用此仓库，新建仓库还是直接放 monorepo 里？
   1. 感觉可以直接放 monorepo，但其他仓库如何使用？非业务代码放在一起貌似不好，原来这就是为啥 sf-modules-tools 要放外面，但放一起也方便看呀
2. 模板可以就放在这个仓库

# 记录

1. [inquirer.js —— 一个用户与命令行交互的工具](https://blog.csdn.net/qq_26733915/article/details/80461257)
2. [node-"fs-extra"模块代替 fs 使用](https://juejin.cn/post/6844903641594216455)
