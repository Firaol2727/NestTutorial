import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import {User} from './entity/users.entity'
@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User)
        private usersRepository: Repository<User>,
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
            const user = manager.create(User, userData);
            return await manager.save(User, user);
        }else{
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
