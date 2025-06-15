import { ResponseUserDto } from '@/users/dto/response-user.dto'

declare global {
  type Maybe<T> = T | undefined | null

  namespace Express {
    interface Request {
      user: ResponseUserDto
    }
  }
}
