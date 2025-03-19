import { Controller, Get, Post, Body, Bind, Dependencies, Param, UsePipes, Query, BadRequestException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserSchema,CreateUserDto, findUserQuerySchema } from './dto/createUser.dto';
// import { ZodValidationPipe } from 'src/helpers/zodValidationPipe';
import { DataSource, QueryRunner } from 'typeorm';
import { ZodValidationPipe } from 'nestjs-zod'
import { User } from './entity/users.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorators';
import { ApiPermissions } from 'src/permissions/Permissions';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly dataSource: DataSource, // Inject DataSource for transactions
    ) {
        this.usersService=usersService;
    }
    @Post()
    
    @RequirePermissions(ApiPermissions.addUser)
    @UsePipes( new ZodValidationPipe(CreateUserDto))
    @ApiResponse({
        status:201,
        description:"User created successfully",
        type:CreateUserDto
    })
    async create(@Body() body: CreateUserDto) {
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
        // Call UserService to create user
        const user = await this.usersService.create({  firstName: body.firstName, lastName: body.lastName,
            email: body.email, password: body.password,roleId:body.roleId
        }, queryRunner);
            // Commit transaction if everything is successful
            await queryRunner.commitTransaction();
            return user;
        } 
        catch (error) {
            console.log("Error ",error);
            await queryRunner.rollbackTransaction(); // Rollback on failure
            throw error;
        } finally {
            await queryRunner.release(); // Release queryRunner after use
        }
    }
    @Get()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @RequirePermissions(ApiPermissions.viewUser)
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
