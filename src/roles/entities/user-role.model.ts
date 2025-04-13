import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@/roles/entities/role.entity'
import { User } from '@/users/entities/user.entity'

@Table({ tableName: 'user_roles' })
export class UserRoles extends Model<UserRoles> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number
}
