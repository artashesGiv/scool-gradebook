import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { RolesController } from './roles.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from '@/roles/entities/role.entity'
import { User } from '@/users/entities/user.entity'
import { UserRoles } from './entities/user-role.model'

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
})
export class RolesModule {}
