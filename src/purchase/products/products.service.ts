import { Injectable } from '@nestjs/common';
import { Product } from './entity/products.entity';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>
    ){}
    async findOne(
            query: any,
            queryRunner?: QueryRunner
        ): Promise<Product | null> {
            if (queryRunner) {
                const manager =  queryRunner.manager;
                return await manager.findOne(Product, {where:query});
            }else{
                const manager =this.productsRepository;
                return await manager.findOne({where:query});
            }
        } 
        async findMany(
            query: any,
            queryRunner?: QueryRunner
        ){
            if (queryRunner) {
                const manager =  queryRunner.manager;
                return await manager.find(Product, {where:query});
            }else{
                const manager =this.productsRepository;
                return await manager.find({where:query});
            }
        }
        async create(productData: Partial<Product>, queryRunner?: QueryRunner): Promise<Product> {
            if (queryRunner) {
                const manager =  queryRunner.manager;
                const product = manager.create(Product, productData);
                return await manager.save(Product, productData);
            }else{
                const manager =this.productsRepository;
                const user = manager.create(productData);
                return await manager.save(user);
            }
        }
        async update(
            id: any,
            productData: Partial<Product>,
            queryRunner?: QueryRunner
        ): Promise<Product|null> {
            if (queryRunner) {
                const manager =  queryRunner.manager;     
                await manager.update(Product,id, productData);
                return await manager.findOne(Product,{where:id});
    
            }else{
                const manager =this.productsRepository;
                return await manager.save(productData);
    
            }
        }
        async deleteProduct(id: any, queryRunner?: QueryRunner): Promise<Boolean> {
        if (queryRunner) {
            const manager =  queryRunner.manager;     
            await manager.delete(Product,{id:id});
            return true;
    
        }else{
            const manager =this.productsRepository;
            await manager.delete(id);
            return true;
        }
        }

}
