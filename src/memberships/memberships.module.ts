import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '@/users/entities/user.entity'
import { Organization } from '@/organization/entities/organization.entity'
import { Role } from '@/roles/entities/role.entity'
import { Membership } from '@/memberships/entities/membership.entity'
import { MembershipsService } from '@/memberships/memberships.service'
import { UsersModule } from '@/users/users.module'

@Module({
  imports: [
    SequelizeModule.forFeature([User, Organization, Role, Membership]),
    forwardRef(() => UsersModule),
  ],
  providers: [MembershipsService],
  exports: [MembershipsService],
})
export class MembershipsModule {}
