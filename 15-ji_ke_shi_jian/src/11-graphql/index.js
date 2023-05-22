const app = new (require('koa'))
const mount = require('koa-mount');
const { graphqlHTTP } = require('koa-graphql')
const MyGraphQLSchema = require('./schema')

app.use(
  mount(
    '/graphql',
    graphqlHTTP({
      schema: MyGraphQLSchema,
      // graphiql: true,
    }),
  ),
);

app.listen(4000);

// 请求  http://127.0.0.1:4000/graphql?query={comment{name}}