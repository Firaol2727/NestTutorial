import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {User} from './entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity/roles.entity';
import { Permissions } from './entity/permissions.entity';
import { UserResolver } from './users.resolver';
import { RoleService } from './roles.service';
// import { RolePermission } from './entity/rolepermissions.entity';
import { PermissionsService } from './permission.service';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports:[TypeOrmModule.forFeature([User,Role,Permissions])],
  providers: [UsersService,UserResolver,RoleService,PermissionsService],
  controllers: [UsersController],
  exports:[UsersService,RoleService,PermissionsService]
})
export class UsersModule {}
