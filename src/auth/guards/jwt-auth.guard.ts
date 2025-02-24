import { ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from 'src/users/users.service';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Inject(UsersService) private readonly usersService: UsersService, // ✅ Inject UsersService
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = (await super.canActivate(context)) as boolean;
    if (!canActivate) return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Extracted by AuthGuard

    if (!user) {
      throw new UnauthorizedException();
    }

    // Fetch full user details from DB
    const fullUser = await this.usersService.findOne({id:user.id});
    if (!fullUser) {
      throw new UnauthorizedException('User not found');
    }

    request.user = fullUser; // Attach full user data

    return true;
  }
}

