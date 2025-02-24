import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,private jwtService: JwtService) {}
    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne({email:username});
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const access_token= await this.jwtService.signAsync({sub:user.id});
        const { password, ...result } = user;
        return {result,access_token};
      }
}
