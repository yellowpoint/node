const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')

const game = require('../1-game/game')

let playerWon = 0
let playerActionLast = ''
let sameCount = 0
http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url)


  if (pathname === '/game') {
    const { action } = querystring.parse(query)

    if (playerWon >= 3) {
      res.writeHead(500)
      res.end('我不玩了')
      return
    }
    if (playerActionLast && playerActionLast === action) {
      sameCount++
    } else {
      sameCount = 0
    }
    playerActionLast = action

    if (sameCount >= 3) {
      res.writeHead(400)
      res.end('你你你！')
      return
    }

    const gameResult = game(action)
    const gameObj = {
      0: () => { res.end('平局') },
      1: () => { res.end('你赢了'); playerWon++ },
      '-1': () => { res.end('你输了') }
    }

    res.writeHead(200)
    gameObj[gameResult]()

  }



  if (pathname === '/favicon.ico') {
    res.writeHead(200)
    return res.end()
  }

  if (pathname === '/') {
    fs.createReadStream(__dirname + '/index.html').pipe(res)
  }
}).listen(2333)