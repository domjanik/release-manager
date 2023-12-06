import FeatureFlagLogDB from '../db/featureFlagDb'
import { FeatureFlagLogDTO } from '../dto/featureFlagLogDto'
import { FeatureFlagLog } from '../dao/featureFlagLog'

async function addFeatureFlagLog(release: FeatureFlagLog): Promise<void> {
  return await FeatureFlagLogDB.addFeatureFlagLog(release)
}
async function getFeatureFlagLogs(): Promise<FeatureFlagLogDTO[]> {
  return (await FeatureFlagLogDB.getFeatureFlagLogs()).map((featureFlagLog) => {
    return featureFlagLog.toDTO()
  })
}

export default {
  addFeatureFlagLog,
  getFeatureFlagLogs
}
