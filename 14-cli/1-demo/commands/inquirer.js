#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs-extra')
const templateList = require(`${__dirname}/../template`)
const { showTable } = require(`${__dirname}/../util/showTable`)
const symbols = require('log-symbols')
const chalk = require('chalk')
chalk.level = 1

const basePath = `${__dirname}/packages/modules/`


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const promptList = [{
  type: "checkbox",
  message: "选择颜色:",
  name: "color",
  choices: [
    "red",
    "blur",
    "green",
    "yellow"
  ],
  pageSize: 5 // 设置行数
}];
let question = [
  {
    name: 'name',
    // type: 'list',
    message: '请输入业务单元名称',
    // choices: ['app', 'modules'],
    validate: async (val) => {

      if (!val) {
        return 'Name is required!'
      }
      if (fs.pathExistsSync(basePath + val)) {
        return '业务单元已存在!'
      }
      return true
    }
  },
]


inquirer.prompt(question).then((answers) => {
  let { name, url } = answers
  fs.ensureDirSync(basePath + name)
  console.log('success!')
  // templateList[name] = url.replace(/[\u0000-\u0019]/g, '') // 过滤 unicode 字符
  // fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(templateList), 'utf-8', (err) => {
  //   if (err) console.log(chalk.red(symbols.error), chalk.red(err))
  //   console.log('\n')
  //   console.log(chalk.green(symbols.success), chalk.green('Add a template successfully!\n'))
  //   console.log(chalk.green('The latest templateList is: \n'))
  //   showTable(templateList)
  // })
})




