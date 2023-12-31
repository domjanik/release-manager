import { Release } from '../dao/release'
import { Version } from '../dao/version'
import { DBClient } from '../utils/dbClient'

async function addRelease(release: Release): Promise<void> {
  const dbClient = await DBClient.getClient()
  await dbClient.db.collection('releases').insertOne(release)
}

async function getRelease(): Promise<Release[]> {
  const dbClient = await DBClient.getClient()
  return (await dbClient.db.collection('releases').find().toArray()).map((res: any) => {
    const version = new Version(
      res.version.projectName,
      res.version.version,
      res.version.createdBy,
      res.version.description,
      res.version.createdAt,
      res.version.id
    )
    return new Release(res.platform, res.geo, res.publishedBy, res.publishedAt, res.createdAt, res.id, version)
  })
}

export default {
  addRelease,
  getRelease,
}
