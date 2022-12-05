const game = (playerAction) => {
  const random = Math.random() * 3
  let computerAction = '石头';
  if (random < 1) computerAction = '剪刀'
  if (random > 2) computerAction = '布'
  console.log('computerAction:', computerAction, 'playerAction:', playerAction);

  if (playerAction === computerAction) {
    console.log('平局');
    return 0
  }
  if (
    playerAction === '石头' && computerAction === '剪刀' ||
    playerAction === '剪刀' && computerAction === '布' ||
    playerAction === '布' && computerAction === '石头'
  ) {
    console.log('玩家赢了');
    return -1
  }

  console.log('玩家输了');
  return 1
}

module.exports = game