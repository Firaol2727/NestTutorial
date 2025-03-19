import {z} from 'zod';
import {createZodDto} from 'nestjs-zod';
export const createUserSchema = z.object({
    firstName:z.string(),
    lastName:z.string(),
    email:z.string().email(),
    password:z.string(),
    roleId:z.number(),
}).required();
export const createUserResponseSchema=z.object({
    id:z.number(),
    firstName:z.string(),
    lastName:z.string(),
    email:z.string().email(),
    roleId:z.number(),
});
export const findUserQuerySchema=z.object({
    firstName:z.string().optional(),
    email:z.string().email().optional(),
    roleId:z.number().optional(),
    isActive:z.boolean().optional(),
    page:z.number().optional(),
    limit:z.number().optional(),
});
// export type CreateUserDto=z.infer<typeof createUserSchema>; 
// export type FindUserQueryDto=z.infer<typeof findUserQuerySchema>;
export class CreateUserDto extends createZodDto(createUserSchema){}
export class FindUserQueryDto extends createZodDto(findUserQuerySchema){}