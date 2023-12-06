import { Version } from '../dao/version'
import { DBClient } from '../utils/dbClient'

async function addVersion(version: Version): Promise<void> {
  const dbClient = await DBClient.getClient()
  await dbClient.db.collection('version').insertOne(version)
}

async function getVersion(project: string, version: string): Promise<Version> {
  const dbClient = await DBClient.getClient()
  return (
    await dbClient.db
      .collection('version')
      .find()
      .filter({
        projectName: project,
        version: version
      })
      .toArray()
  ).map((res: any) => {
    return new Version(res.projectName, res.version, res.createdBy, res.description, res.createdAt, res.id)
  })[0]
}

async function getVersions(): Promise<Version[]> {
  const dbClient = await DBClient.getClient()
  return (await dbClient.db.collection('version').find().toArray()).map((res: any) => {
    return new Version(res.projectName, res.version, res.createdBy, res.description, res.createdAt, res.id)
  })
}

export default {
  addVersion,
  getVersion,
  getVersions
}
