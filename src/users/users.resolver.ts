import { Resolver, Args, Query } from '@nestjs/graphql';
import { User } from '../users/user.model';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
    constructor(private usersService: UsersService) {}

    @Query(() => User)
    async getUserById(@Args('input') id: string) {
        return this.usersService.findById(id);
    }
}
