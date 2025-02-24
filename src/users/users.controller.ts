import { Controller, Get, Post, Body, Bind, Dependencies, Param, UsePipes, Query, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserSchema,CreateUserDto, findUserQuerySchema } from './dto/createUser.dto';
import { ZodValidationPipe } from 'src/helpers/zodValidationPipe';
import { DataSource, QueryRunner } from 'typeorm';
@Controller('users')
// @Dependencies('UsersService')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly dataSource: DataSource, // Inject DataSource for transactions
    ) {
        this.usersService=usersService;
    }
    @Post()
    @UsePipes(new ZodValidationPipe(createUserSchema))
    async create(@Body() body: unknown) {
        const parsedData = createUserSchema.safeParse(body);
        if (!parsedData.success) {
        throw new BadRequestException(parsedData.error.format());
        }
        const  parsedBody = parsedData.data;

        // Create a new transaction
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
        // Call UserService to create user
        const user = await this.usersService.create({  firstName: parsedBody.firstName, lastName: parsedBody.lastName,
            email: parsedBody.email, password: parsedBody.password,roleId:parsedBody.roleId
        }, queryRunner);
            // Commit transaction if everything is successful
            await queryRunner.commitTransaction();
            return user;
        } 
        catch (error) {
            console.log("Error ",error);
            await queryRunner.rollbackTransaction(); // Rollback on failure
            throw new InternalServerErrorException('Transaction failed');
        } finally {
            await queryRunner.release(); // Release queryRunner after use
        }
    }
    @Get()
    findMany(@Query() query:unknown) {
        const parsedData = findUserQuerySchema.safeParse(query);
        console.log("query ",parsedData);
        return this.usersService.findMany(parsedData.data);
    }
    @Get(':id')
    findOne(@Param() { id }: { id: number }) {
        console.log("id ",id);
        return this.usersService.findOne({id});
    }
}
