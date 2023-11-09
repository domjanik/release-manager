import { MongoClient, Db } from "mongodb";

export class DBClient {
  private connectionString = process.env.DB_ADRESS || "";
  private mongoClient = new MongoClient(this.connectionString);
  public db: Db;
  private conn: MongoClient;
  static client: DBClient;

  async initializeConnection() {
    this.conn = await this.mongoClient.connect();
    this.conn.on("error", (err) => {
      console.log(err);
    });
    this.conn.once("open", () => {
      console.log("Connected to database");
    });
    this.db = this.conn.db("release-manager");

    // this.fillDatabase();
  }

  static async getClient() {
    if (!this.client) {
      this.client = new DBClient();
      await this.client.initializeConnection();
    }
    return this.client;
  }

  // fillDatabase() {
  //   const platforms = ["UCP", "MetaCritic", "GameSpot", "Fanatical"];
  //   const projects = ["AdEngine", "Identity Engine", "CMP"];
  //   const geos = ["US", "UK", "DE", "FR", "ES", "IT", "JP", "XX", "PL"];
  //   const users = ["John Doe", "Jane Doe", "Foo Bar", "Baz Qux"];

  //   const projectReleaseAmount = 10_000;

  //   const releases = [];

  //   for (let i = 0; i < projectReleaseAmount; i++) {
  //     const platform = platforms[Math.floor(Math.random() * platforms.length)];
  //     const project = projects[Math.floor(Math.random() * projects.length)];
  //     const geo = geos[Math.floor(Math.random() * geos.length)];
  //     const user = users[Math.floor(Math.random() * users.length)];
  //     const version = Math.floor(Math.random() * 1000);
  //     const description = "Lorem ipsum dolor sit amet";
  //     const publishedAt = new Date(
  //       Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 3)
  //     );
  //     releases.push({
  //       platform,
  //       projectName: project,
  //       geo,
  //       publishedBy: user,
  //       version,
  //       description,
  //       publishedAt,
  //     });
  //   }

  //   this.db.collection("releases").insertMany(releases);
  // }
}
