import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import {User} from './entity/users.entity'
import { RoleService } from './roles.service';
@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private roleService:RoleService
    ){}
    async findOne(
        query: any,
        queryRunner?: QueryRunner
    ): Promise<User | null> {
        if (queryRunner) {
            const manager =  queryRunner.manager;
            return await manager.findOne(User, {where:query,relations:["role"]});
        }else{
            const manager =this.usersRepository;
            return await manager.findOne({where:query,relations:["role","role.permissions"]});
        }
    } 
    async findMany(
        query: any,
        queryRunner?: QueryRunner
    ){
        console.log("query ",query);
        if (queryRunner) {
            const manager =  queryRunner.manager;
            return await manager.find(User, {where:query});
        }else{
            const manager =this.usersRepository;
            return await manager.find({where:query});
        }
    }
    async create(userData: Partial<User>, queryRunner?: QueryRunner): Promise<User> {
        if (queryRunner) {
            const manager =  queryRunner.manager;
            let role = await this.roleService.findOne({id:userData.roleId});
            if(!role){
                throw new NotFoundException("Role not found");
            }
            const user = manager.create(User, userData);
            return await manager.save(User, user);
        }else{
            let role = await this.roleService.findOne({id:userData.roleId});
            if(!role){
                throw new NotFoundException("Role not found");
            }
            const manager =this.usersRepository;
            const user = manager.create(userData);
            return await manager.save(user);
        }
    }
    async update(
        id: any,
        userData: Partial<User>,
        queryRunner?: QueryRunner
    ): Promise<User|null> {
        if (queryRunner) {
            const manager =  queryRunner.manager;     
            await manager.update(User,id, userData);
            return await manager.findOne(User,{where:id});

        }else{
            const manager =this.usersRepository;
            return await manager.save(userData);

        }
    }
    async deleteUser(id: any, queryRunner?: QueryRunner): Promise<Boolean> {
    if (queryRunner) {
        const manager =  queryRunner.manager;     
        await manager.delete(User,{id:id});
        return true;

    }else{
        const manager =this.usersRepository;
        await manager.delete(id);
        return true;
    }
    }
    

}
