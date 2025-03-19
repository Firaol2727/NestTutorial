import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @HttpCode(HttpStatus.OK)
    @Post('login')
     @UsePipes( new ZodValidationPipe(SignInDTO))
    signIn(@Body() signInDto: SignInDTO) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
    @Get('permissions')
    getPermissions() {
        return this.authService.getAllPermissions();
    }
    @Get('roles')
    getRoles() {
        return this.authService.getAllRoles();
    }
    @Get('roles/:id')
    getRolePermissions(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})) id: number) {
        return this.authService.getRoleWithPermissions(id);
    }
}
