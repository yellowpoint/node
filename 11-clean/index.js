const fs = require("fs")
const lines = fs.readFileSync("text.txt").toString().split("\n")
if (lines.includes("This is a line")) {
  // Do something.
  console.log('aaa')
}