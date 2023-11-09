import { FeatureFlagLog } from "../dao/featureFlagLog";
import { DBClient } from "../utils/dbClient";

async function getFeatureFlagLogs(): Promise<FeatureFlagLog[]> {
  const dbClient = await DBClient.getClient();
  return (await dbClient.db.collection("featureFlagLogs").find().toArray()).map(
    (res: any) => {
      return new FeatureFlagLog(
        res.platform,
        res.name,
        res.geo,
        res.sampling,
        res.changedBy,
        res.value,
        res.publishedAt,
        res.createdAt,
        res.id
      );
    }
  );
}

async function addFeatureFlagLog(
  featureFlagLog: FeatureFlagLog
): Promise<void> {
  const dbClient = await DBClient.getClient();
  await dbClient.db.collection("featureFlagLogs").insertOne(featureFlagLog);
}

export default {
  getFeatureFlagLogs,
  addFeatureFlagLog,
};
