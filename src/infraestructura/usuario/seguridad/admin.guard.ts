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
    const roles: string[] = request.body.rolesGuard;

    if (roles) {
      if (roles.includes(Roles.admin)) {
        return true;
      }
    }

    throw new HttpException('Acceso Denegado', HttpStatus.UNAUTHORIZED);
  }
}
