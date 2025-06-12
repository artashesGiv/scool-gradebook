import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { JwtService } from '@nestjs/jwt'
import { ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import { DataWrapperInterceptor } from '@/common/interceptors/data-wrapper.interceptor'

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(cookieParser(process.env.SECRET || ''))

  app.enableCors({
    origin: ['http://localhost:5000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  })

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

  const reflector = app.get(Reflector)
  app.useGlobalGuards(new JwtAuthGuard(app.get(JwtService), reflector))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // выбрасывать лишние поля
      transform: true, // приводить типы
      forbidNonWhitelisted: true,
    }),
  )
  app.useGlobalInterceptors(new DataWrapperInterceptor())

  await app.listen(port)
  console.log(`Server running on port ${port}`)
}

void bootstrap()
