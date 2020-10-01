import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Roles } from '../../../dominio/usuario/modelo/usuario';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const rolAdmin: string = request.header('rolAdmin');

    if (rolAdmin) {
      if (Object.keys(Roles).includes(rolAdmin)) {
        return true;
      }
    }

    throw new HttpException('Acceso Denegado', HttpStatus.UNAUTHORIZED);
  }
}
