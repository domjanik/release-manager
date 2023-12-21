import express from 'express'
import featureFlagService from '../services/featureFlagService'
import { FeatureFlagLogDTO } from '../dto/featureFlagLogDto'
import { FeatureFlagLog } from '../dao/featureFlagLog'
import { VersionDTO } from '../dto/versionDto'
import { ReleaseDTO } from '../dto/releaseDto'
import releaseService from '../services/releaseService'
import versionService from '../services/versionService'
import { Version } from '../dao/version'

const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log(`[Batch] ${Date.now()}: ${req.method} ${req.url}`)
  next()
})
router.route('/batch').post((req, res) => {
  try {
    const batch = req.body
    batch.featureFlags.forEach((featureFlagLog: FeatureFlagLogDTO) => {
      featureFlagService.addFeatureFlagLog(FeatureFlagLog.fromDTO(featureFlagLog))
    })
    batch.releases.forEach((release: ReleaseDTO) => {
      releaseService.addRelease(release)
    })

    batch.versions.forEach((version: VersionDTO) => {
      versionService.addVersion(Version.fromDTO(version))
    })
    res.status(200).send('Added a new feature flag log')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Something went wrong')
  }
})

export default router
