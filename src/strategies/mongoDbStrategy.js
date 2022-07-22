import mongodb from 'mongodb'

export class MongoDBStrategy {
  #instance
  constructor(connectionString) {
    const { pathname: dbName } = new URL(connectionString)
    this.connectionString = connectionString.replace(dbName, '')
    this.db = dbName.replace(/\W/, '')
    this.collection = 'warriors'
  }

  async connect() {
    const client = new mongodb.MongoClient(this.connectionString, {
      useUnifiedTopology: true
    })

    await client.connect()

    const db = client.db(this.db).collection(this.collection)

    this.#instance = db
  }

  async create(item) {
    // const result = await this.#instance.insertOne(item)
    // const result2 = await this.#instance.find().toArray()
    // console.log(result2)
    return this.#instance.insertOne(item)
  }

  async read(item) {
    return this.#instance.find().toArray()
  }
}
