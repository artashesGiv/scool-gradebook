import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Membership } from '@/memberships/entities/membership.entity'

interface UserCreationAttrs {
  email: string
  password: string
  name: string
  middleName?: string
  lastName: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 'uuid' })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string

  @ApiProperty({ example: 'email@gmail.com' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string

  @ApiProperty({ example: '123qweASD' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string

  @ApiProperty({ example: 'name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string

  @ApiProperty({ example: 'middle name' })
  @Column({
    type: DataType.STRING,
  })
  middleName?: string

  @ApiProperty({ example: null })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string

  @ApiProperty({ example: false })
  @Default(false)
  @Column
  isSystemAdmin!: boolean

  @ApiProperty({ example: '+79996277016' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  phone?: string

  @HasMany(() => Membership) memberships: Membership[]
}
