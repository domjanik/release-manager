import express from 'express'
import featureFlagService from '../services/featureFlagService'
import { FeatureFlagLogDTO } from '../dto/featureFlagLogDto'
import { FeatureFlagLog } from '../dao/featureFlagLog'

const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log(`[Feature Flags] ${Date.now()}: ${req.method} ${req.url}`)
  next()
})
router
  .route('/feature-flag')
  .get(async (req, res) => {
    try {
      const featureFlags = await featureFlagService.getFeatureFlagLogs()
      return res.status(200).send(featureFlags)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Something went wrong')
    }
  })
  .post((req, res) => {
    try {
      const featureFlagLog = req.body as FeatureFlagLogDTO
      featureFlagService.addFeatureFlagLog(FeatureFlagLog.fromDTO(featureFlagLog))
      res.status(200).send('Added a new feature flag log')
    } catch (error) {
      console.error(error)
      return res.status(500).send('Something went wrong')
    }
  })

export default router
