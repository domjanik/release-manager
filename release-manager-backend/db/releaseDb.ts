import { Release } from "../dao/release";
import { DBClient } from "../utils/dbClient";

async function addRelease(release: Release): Promise<void> {
  const dbClient = await DBClient.getClient();
  await dbClient.db.collection("releases").insertOne(release);
}

async function getRelease(): Promise<Release[]> {
  const dbClient = await DBClient.getClient();
  return (await dbClient.db.collection("releases").find().toArray()).map(
    (res: any) => {
      return new Release(
        res.platform,
        res.projectName,
        res.geo,
        res.publishedBy,
        res.version,
        res.description
      );
    }
  );
}

export default {
  addRelease,
  getRelease,
};
