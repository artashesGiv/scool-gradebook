import { Module } from '@nestjs/common'
import { OrganizationService } from './organization.service'
import { OrganizationController } from './organization.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Organization } from '@/organization/entities/organization.entity'
import { MembershipsModule } from '@/memberships/memberships.module'

@Module({
  controllers: [OrganizationController],
  imports: [MembershipsModule, SequelizeModule.forFeature([Organization])],
  providers: [OrganizationService],
})
export class OrganizationModule {}
