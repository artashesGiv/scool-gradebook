import { forwardRef, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './entities/user.entity'
import { Role } from '@/roles/entities/role.entity'
import { RolesModule } from '@/roles/roles.module'
import { MembershipsModule } from '@/memberships/memberships.module'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role]),
    RolesModule,
    forwardRef(() => MembershipsModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
