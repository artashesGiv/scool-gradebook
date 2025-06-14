import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from '@/roles/entities/role.entity'
import { User } from '@/users/entities/user.entity'

@Module({
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User])],
  exports: [RolesService],
})
export class RolesModule {}
