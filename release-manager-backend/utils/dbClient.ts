import { MongoClient, Db } from 'mongodb'

export class DBClient {
  private connectionString = process.env.DB_ADRESS || ''
  private mongoClient = new MongoClient(this.connectionString)
  public db: Db
  private conn: MongoClient
  static client: DBClient

  async initializeConnection() {
    this.conn = await this.mongoClient.connect()
    this.conn.on('error', (err) => {
      console.log(err)
    })
    this.conn.once('open', () => {
      console.log('Connected to database')
    })
    this.db = this.conn.db('release-manager')
  }

  static async getClient() {
    if (!this.client) {
      this.client = new DBClient()
      await this.client.initializeConnection()
    }
    return this.client
  }
}
