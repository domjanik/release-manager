import express, { Express } from 'express'
import dotenv from 'dotenv'
import ReleasesController from './controllers/releasesController'
import FeatureFlagLogController from './controllers/featureFlagLogsController'
import VersionController from './controllers/versionController'
import BatchController from './controllers/batchController'
import cors from 'cors'
import bodyParser from 'body-parser'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())

app.use(BatchController)
app.use(ReleasesController)
app.use(VersionController)
app.use(FeatureFlagLogController)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
