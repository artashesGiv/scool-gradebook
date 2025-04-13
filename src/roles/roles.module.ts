import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from '@/roles/entities/role.entity'
import { User } from '@/users/entities/user.entity'
import { UserRoles } from './entities/user-role.model'

@Module({
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RolesService],
})
export class RolesModule {}
