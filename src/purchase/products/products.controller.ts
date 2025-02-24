import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { ProductsService } from './products.service';
import { z } from 'zod';
import { createProductSchema } from './dto/createProduct.dto';
import { ApiPermissions } from 'src/permissions/Permissions';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorators';
@Controller('products')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService, 
        private readonly dataSource: DataSource) {}
    @Post()
    @RequirePermissions(ApiPermissions.addProduct)
    async create(@Body() body: unknown) {
        const parsedData =  createProductSchema.safeParse(body);
        if (!parsedData.success) {
            throw new BadRequestException(parsedData.error.errors)
        }
        const parsedBody=parsedData.data;
        const  queryRunner:QueryRunner=this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const product=await this.productsService.create(
                parsedBody
            )
            await queryRunner.commitTransaction();
            return product;
        } catch (error) {
            console.log("Error ",error);
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException("Transaction Failed")
        }
        finally{
            await queryRunner.release();
        }
    }

    @Get()
    @RequirePermissions(ApiPermissions.viewProduct)
    findMany(@Query() query:unknown) {
        console.log("query ",query);
        return this.productsService.findMany(query);
    }
    @Get(':id')
    @RequirePermissions(ApiPermissions.viewProduct)
    findOne(@Param() { id }: { id: number }) {
        console.log("id ",id);
        return this.productsService.findOne({id});
    }
}

