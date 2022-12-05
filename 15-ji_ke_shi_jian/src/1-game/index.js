// const playerAction = process.argv[process.argv.length - 1]
const game = require('./game')
let count = 0
process.stdin.on('data', e => {
  // console.log('e', e.toString().trim());
  const playerAction = e.toString().trim()

  const result = game(playerAction)

  if (result === -1) count++
  if (count >= 3) {
    console.log('我不玩了');
    process.exit()
  }
})
