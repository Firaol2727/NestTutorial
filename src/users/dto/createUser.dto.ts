import {z} from 'zod';
export const createUserSchema = z.object({
    firstName:z.string(),
    lastName:z.string(),
    email:z.string().email(),
    password:z.string(),
    roleId:z.number(),
}).required();
export const findUserQuerySchema=z.object({
    firstName:z.string().optional(),
    email:z.string().email().optional(),
    roleId:z.number().optional(),
    isActive:z.boolean().optional(),
    page:z.number().optional(),
    limit:z.number().optional(),
});
export type CreateUserDto=z.infer<typeof createUserSchema>; 
export type FindUserQueryDto=z.infer<typeof findUserQuerySchema>;