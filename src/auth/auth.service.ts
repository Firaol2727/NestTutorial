import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PermissionsService } from 'src/users/permission.service';
import { RoleService } from 'src/users/roles.service';
import { Permissions } from 'src/users/entity/permissions.entity';
import { Role } from 'src/users/entity/roles.entity';
@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
      private permissionsService: PermissionsService,
      private rolesService: RoleService,
      
    ) {}
    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne({email:username});
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const access_token= await this.jwtService.signAsync({sub:user.id});
        const { password, ...result } = user;
        return {result,access_token};
    }
    async getAllPermissions(): Promise<Permissions[]> {
        const permissions = await this.permissionsService.findMany({});
        return permissions;
    }
    async getAllRoles(): Promise<Role[]> {
        const roles = await this.rolesService.findMany({});
        return roles;
    }
    async getRoleWithPermissions(roleId: number): Promise<Role|null> {
        const role = await this.rolesService.findOne({id:roleId});
        // const permissions = await this.permissionsService.findMany({roleId:roleId});
        return role;
    }
}
