import { ContextStrategy } from './src/base/contextStrategy.js'
import { MongoDBStrategy } from './src/strategies/mongoDbStrategy.js'
import { PostgresStrategy } from './src/strategies/postgresStrategy.js'

const postgresUri = 'postgres://thais:thais@localhost:5432/heroes'
const mongoUri = 'mongodb://thais:thais@localhost:27017/heroes'

const postgresContext = new ContextStrategy(new PostgresStrategy(postgresUri))
const mongoDbContext = new ContextStrategy(new MongoDBStrategy(mongoUri))

await postgresContext.connect()
await mongoDbContext.connect()


const data = [
  {
    name: 'thais',
    type: 'transaction'
  },
  {
    name: 'erick',
    type: 'activityLog'
  },
]

const contextType = {
  transaction: postgresContext,
  activityLog: mongoDbContext
}

for (const { type, name } of data) {
  const context = contextType[type]

  await context.create({ name: `${name} - ${Date.now()}` })

  console.log(await context.read())
}
