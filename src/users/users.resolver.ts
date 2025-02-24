import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entity/users.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
  @Field(() => Int)
  roleId: number;
}

@Resolver(() =>   UserModel)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [UserModel])
  async getUsers(): Promise<UserModel[]> {
    return await this.userService.findMany({});
  }

  @Query(() => UserModel, { nullable: true })
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<User|null> {
    return await this.userService.findOne(id);
  }

  @Mutation(() => UserModel)
  async createUser(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('roleId', { type: () => Int }) roleId: number,
  ): Promise<UserModel> {
    return await this.userService.create({
      firstName,
      lastName,
      email,
      password,
      roleId
    });
  }
}
