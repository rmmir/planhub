import { Resolver, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { User } from '../users/user.model';

@UseGuards(JwtAuthGuard)
@Resolver()
export class UsersResolver {
    constructor(private usersService: UsersService) {}

    @Query(() => User)
    async getUserById(@Args('input') id: string) {
        console.log(id)
        return this.usersService.findById(id);
    }
}
