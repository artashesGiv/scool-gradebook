import { Module } from '@nestjs/common'
import { UsersModule } from '@/users/users.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import * as process from 'node:process'
import { User } from '@/users/entities/user.entity'
import { RolesModule } from '@/roles/roles.module'
import { Role } from '@/roles/entities/role.entity'
import { UserRoles } from '@/roles/entities/user-role.model'

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      models: [User, Role, UserRoles],
    }),
    RolesModule,
  ],
})
export class AppModule {}
