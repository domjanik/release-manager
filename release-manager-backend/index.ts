import express, { Express } from 'express'
import dotenv from 'dotenv'
import ReleasesController from './controllers/releasesController'
import FeatureFlagLogController from './controllers/featureFlagLogsController'
import VersionController from './controllers/versionController'
import cors from 'cors'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(ReleasesController)
app.use(VersionController)
app.use(FeatureFlagLogController)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
