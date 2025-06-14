import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '@/users/entities/user.entity'
import { Organization } from '@/organization/entities/organization.entity'
import { Role } from '@/roles/entities/role.entity'
import { Membership } from '@/memberships/entities/membership.entity'
import { MembershipsService } from '@/memberships/memberships.service'

@Module({
  imports: [SequelizeModule.forFeature([User, Organization, Role, Membership])],
  providers: [MembershipsService],
  exports: [MembershipsService],
})
export class MembershipsModule {}
