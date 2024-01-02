import { bootstrapControllers, getControllers } from 'amala'
import { bearerToken } from 'koa-bearer-token'
import config from '../config'
import { AuthController } from './controllers/AuthController'
import { HelloController } from './controllers/HelloController'

export async function launchAPI() {
  console.log('Launching Rest API...')

  const { app, router } = await bootstrapControllers({
    basePath: '/api',
    controllers: [AuthController, HelloController],
    disableVersioning: true,
    validatorOptions: {
      whitelist: true,
      forbidNonWhitelisted: true,
    },
    flow: [bearerToken({ reqKey: 'accessToken' })],
    openAPI: {
      enabled: true,
      publicURL: config.server.hostUrl,
      spec: {
        info: {
          title: config.appName,
          version: '1',
        },
      },
    },
    attachRoutes: true,
    diagnostics: config.devMode,
    useHelmet: true,
  })

  app.keys = config.auth.keys
  app.proxy = true

  console.log('Number of API controllers:', Object.keys(getControllers()).length)

  const port = config.server.port
  app.listen(port)

  console.log(`API running on port ${port}!`)
}
