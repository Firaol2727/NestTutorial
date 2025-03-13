import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Permissions } from './entity/permissions.entity';   
@Injectable()
export class PermissionsService {
    constructor (
        @InjectRepository(Permissions)
        private permissionsRepository: Repository<Permissions>,
    ){}
    async findOne(
        query: any,
        queryRunner?: QueryRunner
    ): Promise<Permissions | null> {
        if (queryRunner) {
            const manager =  queryRunner.manager;
            return await manager.findOne(Permissions, {where:query,relations:["role"]});
        }else{
            const manager =this.permissionsRepository;
            return await manager.findOne({where:query});
        }
    } 
    async findMany(
        query: any,
        queryRunner?: QueryRunner
    ){
        console.log("query ",query);
        if (queryRunner) {
            const manager =  queryRunner.manager;
            return await manager.find(Permissions, {where:query});
        }else{
            const manager =this.permissionsRepository;
            return await manager.find({where:query});
        }
    }
    async create(userData: Partial<Permissions>, queryRunner?: QueryRunner): Promise<Permissions> {
        if (queryRunner) {
            const manager =  queryRunner.manager;
            const user = manager.create(Permissions, userData);
            return await manager.save(Permissions, user);
        }else{
            const manager =this.permissionsRepository;
            const user = manager.create(userData);
            return await manager.save(user);
        }
    }
    async update(
        id: any,
        userData: Partial<Permissions>,
        queryRunner?: QueryRunner
    ): Promise<Permissions|null> {
        if (queryRunner) {
            const manager =  queryRunner.manager;     
            await manager.update(Permissions,id, userData);
            return await manager.findOne(Permissions,{where:id});

        }else{
            const manager =this.permissionsRepository;
            return await manager.save(userData);

        }
    }
    async deleteUser(id: any, queryRunner?: QueryRunner): Promise<Boolean> {
    if (queryRunner) {
        const manager =  queryRunner.manager;     
        await manager.delete(Permissions,{id:id});
        return true;

    }else{
        const manager =this.permissionsRepository;
        await manager.delete(id);
        return true;
    }
    }
    

}
