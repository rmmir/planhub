import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';
import { RegisterInput } from '../auth/dto/auth.input';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserInput: RegisterInput): Promise<User> {
        const existingUser = await this.usersRepository.findOne({
            where: [
                { username: createUserInput.username },
                { email: createUserInput.email },
            ],
        });
        if (existingUser) {
            throw new ConflictException('Username or email already exists');
        }

        const user = this.usersRepository.create(createUserInput);
        return this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.usersRepository.findOne({
            where: { email },
        });
        return user;
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await this.usersRepository.findOne({
            where: { username },
        });
        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.usersRepository.findOne({ where: { id } });
        return user;
    }
}
