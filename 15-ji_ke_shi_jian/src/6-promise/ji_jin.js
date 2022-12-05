let count = 100000
let count_control = 100000
let profit = 0
let profit_control = 0
let index = 3000
const trend = [1, -2, 1, -1, -1, -1, 3]
const calc = (num) => {
  index += num / 100 * index
  profit = count * num / 100
  count += profit
  count -= num * 10000

  profit_control = count_control * num / 100
  count_control += profit_control

  console.log(num, `${count}(${profit})`, `${count_control}(${profit_control})`);
}


trend.forEach(i => {
  calc(i)
})
// console.log('count', count);