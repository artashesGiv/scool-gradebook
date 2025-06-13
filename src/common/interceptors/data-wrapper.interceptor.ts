import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class DataWrapperInterceptor<T>
  implements NestInterceptor<T, { data: T }>
{
  intercept(
    _: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{ data: T }> {
    return next.handle().pipe(map(value => ({ data: value })))
  }
}