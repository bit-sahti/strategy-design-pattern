import knex from 'knex'

export class PostgresStrategy {
  #instance
  constructor(connectionString) {
    this.connectionString = connectionString
    this.table = 'warriors'
  }

  async connect() {
    try {
      this.#instance = knex({
        client: 'pg',
        connection: this.connectionString
      })
  
      return this.#instance.raw('select 1 + 1 as result')
    } catch (error) {
      console.log(error)
    }
  }

  async create(item) {
    return this.#instance
              .insert(item)
              .into(this.table)
  }

  read(item) {
    return this.#instance
              .select()
              .from(this.table)
  }
}
