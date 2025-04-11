import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const port = process.env.PORT ?? 3000

  const config = new DocumentBuilder()
    .setTitle('Money')
    .setDescription('')
    .setVersion('0.0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  app.set('query parser', 'extended')
  app.setGlobalPrefix('api')
  await app.listen(port)
  console.log(`Server running on port ${port}`)
}

void bootstrap()
