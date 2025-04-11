import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const port = process.env.PORT ?? 3000
  app.set('query parser', 'extended')
  app.setGlobalPrefix('api')
  await app.listen(port)
  console.log(`Server running on port ${port}`)
}

void bootstrap()
