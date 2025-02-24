import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {User} from './entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity/roles.entity';
import { Permissions } from './entity/permissions.entity';
import { UserResolver } from './users.resolver';
// import { RolePermission } from './entity/rolepermissions.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Role,Permissions])],
  providers: [UsersService,UserResolver],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
