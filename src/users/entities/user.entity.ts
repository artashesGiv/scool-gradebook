import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface UsersCreationAttrs {
  email: string
  password: string
  name: string
  middleName: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UsersCreationAttrs> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number

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
    allowNull: false,
  })
  middleName: string

  @ApiProperty({ example: null })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName: string
}
