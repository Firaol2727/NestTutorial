import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Role } from './entity/roles.entity';
@Injectable()
export class RoleService {
    constructor (
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ){}
    async findOne(
        query: any,
        queryRunner?: QueryRunner
    ): Promise<Role | null> {
        if (queryRunner) {
            const manager =  queryRunner.manager;
            return await manager.findOne(Role, {where:query});
        }else{
            const manager =this.roleRepository;
            return await manager.findOne({where:query,relations:["permissions"]});
        }
    } 
    async findMany(
        query: any,
        queryRunner?: QueryRunner
    ){
        console.log("query ",query);
        if (queryRunner) {
            const manager =  queryRunner.manager;
            return await manager.find(Role, {where:query});
        }else{
            const manager =this.roleRepository;
            return await manager.find({where:query});
        }
    }
    async create(userData: Partial<Role>, queryRunner?: QueryRunner): Promise<Role> {
        if (queryRunner) {
            const manager =  queryRunner.manager;
            const user = manager.create(Role, userData);
            return await manager.save(Role, user);
        }else{
            const manager =this.roleRepository;
            const user = manager.create(userData);
            return await manager.save(user);
        }
    }
    async update(
        id: any,
        userData: Partial<Role>,
        queryRunner?: QueryRunner
    ): Promise<Role|null> {
        if (queryRunner) {
            const manager =  queryRunner.manager;     
            await manager.update(Role,id, userData);
            return await manager.findOne(Role,{where:id});

        }else{
            const manager =this.roleRepository;
            return await manager.save(userData);

        }
    }
    async deleteUser(id: any, queryRunner?: QueryRunner): Promise<Boolean> {
    if (queryRunner) {
        const manager =  queryRunner.manager;     
        await manager.delete(Role,{id:id});
        return true;

    }else{
        const manager =this.roleRepository;
        await manager.delete(id);
        return true;
    }
    }
    

}
