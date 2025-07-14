import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginInput } from './dto/auth.input';
import { User } from '../users/user.model';
import { RegisterInput } from './dto/auth.input';
import { UserData } from './types/user-payload.type';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(
        email: string,
        password: string,
    ): Promise<UserData | null> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }

        return null;
    }

    async login(loginInput: LoginInput) {
        const user = await this.validateUser(
            loginInput.email,
            loginInput.password,
        );
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return {
            access_token: this.jwtService.sign({
                username: user.username,
                sub: user.id,
            }),
            user,
        };
    }

    async register(registerInput: RegisterInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(registerInput.password, 10);
        return this.usersService.create({
            ...registerInput,
            password: hashedPassword,
        });
    }
}
