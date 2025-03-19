import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const signInSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }).min(1, "Username cannot be empty"),
  password: z.string({
    required_error: "Password is required",
  }).min(6, "Password must be at least 6 characters"),
}).required();
export class SignInDTO extends createZodDto(signInSchema){}
