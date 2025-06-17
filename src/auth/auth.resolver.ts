import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto/auth.input';
import { LoginResponse } from './dto/auth.response';
import { User } from '../users/user.model';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => User)
    async register(@Args('input') registerInput: RegisterInput) {
        return this.authService.register(registerInput);
    }

    @Mutation(() => LoginResponse)
    async login(@Args('input') loginInput: LoginInput) {
        return this.authService.login(loginInput);
    }
}
