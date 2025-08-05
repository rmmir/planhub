import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginInput } from './dto/auth.input';
import { RegisterInput } from './dto/auth.input';
import { UserData } from './types/user-payload.type';
import { LoginResponse, RegisterResponse } from './dto/auth.response';

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

    async login(loginInput: LoginInput): Promise<LoginResponse> {
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
        };
    }

    async register(registerInput: RegisterInput): Promise<RegisterResponse> {
        const resultByEmail = await this.usersService.findByEmail(
            registerInput.email,
        );
        if (resultByEmail) {
            throw new ConflictException(
                `User with email: ${resultByEmail.email} already exists`,
            );
        }

        const resultByUsername = await this.usersService.findByUsername(
            registerInput.username,
        );
        if (resultByUsername) {
            throw new ConflictException(
                `User with email: ${resultByUsername.email} already exists`,
            );
        }

        const hashedPassword = await bcrypt.hash(registerInput.password, 10);
        await this.usersService.create({
            ...registerInput,
            password: hashedPassword,
        });

        return {
            message: `User has been successfully created`,
        };
    }
}
