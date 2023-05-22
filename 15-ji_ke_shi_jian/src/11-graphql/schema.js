const { buildSchema } = require("graphql");

const mockData = {
  1: {
    id: 1,
    name: '张三',
    praise: 10
  },
  2: {
    id: 2,
    name: '赵四',
    praise: 20
  },
  3: {
    id: 3,
    name: '王五',
    praise: 30
  }
}
const schema = buildSchema(`
type Comment {
  id: Int
  name: String
  praise: Int
}
type Query {
  comment: [Comment]
}
type Mutation{
  praise(id:Int):Int
}
`)

schema.getQueryType().getFields().comment.resolve = () => {
  return Object.keys(mockData).map(key => mockData[key])
}
schema.getMutationType().getFields().praise.resolve = (arg0, { id }) => {
  console.log('id', id);

  mockData[id].praise++
  return mockData[id].praise
}


module.exports = schema