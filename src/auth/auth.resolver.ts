import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto/auth.input';
import { LoginResponse, RegisterResponse } from './dto/auth.response';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => RegisterResponse)
    async register(@Args('input') registerInput: RegisterInput) {
        return this.authService.register(registerInput);
    }

    @Mutation(() => LoginResponse)
    async login(@Args('input') loginInput: LoginInput) {
        return this.authService.login(loginInput);
    }
}
