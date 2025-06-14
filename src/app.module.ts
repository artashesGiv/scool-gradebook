import { Module } from '@nestjs/common'
import { UsersModule } from '@/users/users.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import * as process from 'node:process'
import { User } from '@/users/entities/user.entity'
import { RolesModule } from '@/roles/roles.module'
import { Role } from '@/roles/entities/role.entity'
import { AuthModule } from './auth/auth.module'
import { OrganizationModule } from './organization/organization.module'
import { MembershipsModule } from './memberships/memberships.module'
import { Membership } from '@/memberships/entities/membership.entity'
import { Organization } from '@/organization/entities/organization.entity'

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
      sync: { alter: true },
      models: [User, Role, Membership, Organization],
    }),
    RolesModule,
    AuthModule,
    OrganizationModule,
    MembershipsModule,
  ],
})
export class AppModule {}
