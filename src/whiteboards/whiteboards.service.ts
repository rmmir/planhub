import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Whiteboard } from './whiteboards.model';
import { Repository } from 'typeorm';
import { CreateWhiteboardInput } from './dto/whiteboards.input';
import { CreatedWhiteboardResponse } from './dto/whiteboards.response';

@Injectable()
export class WhiteboardsService {
    constructor(
        @InjectRepository(Whiteboard)
        private whiteboardsRepository: Repository<Whiteboard>,
    ) {}

    async create(input: CreateWhiteboardInput): Promise<CreatedWhiteboardResponse> {
        const existingWhiteboard = await this.findByName(input.name);

        if (existingWhiteboard) {
            throw new ConflictException(`Whiteboard with the name: ${input.name} already exists`);
        }

        const whiteboard = this.whiteboardsRepository.create(input);
        this.whiteboardsRepository.save(whiteboard);

        return {
            id: whiteboard.id,
            message: 'Whiteboard created successfully'
        }
    }

    async findAll(): Promise<Whiteboard[]> {
        const whiteboards = await this.whiteboardsRepository.find();
        return whiteboards;
    }

    async findById(id: string): Promise<Whiteboard | null> {
        const whiteboard = await this.whiteboardsRepository.findOneBy({ id });

        return whiteboard;
    }

    async findByName(name: string): Promise<Whiteboard | null> {
        const whiteboard = await this.whiteboardsRepository.findOneBy({ name });

        return whiteboard;
    }
}
