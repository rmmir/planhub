import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Whiteboard } from './whiteboards.model';
import {
    CreateWhiteboardInput,
    DeleteWhiteboardInput,
    UpdateWhiteboardElementsInput,
    UpdateWhiteboardMetadataInput,
} from './dto/whiteboards.input';
import {
    CreatedWhiteboardResponse,
    DeletedWhiteboardResponse,
    UpdatedWhiteboardElementsResponse,
    UpdatedWhiteboardMetadataResponse,
} from './dto/whiteboards.response';

@Injectable()
export class WhiteboardsService {
    constructor(
        @InjectRepository(Whiteboard)
        private whiteboardsRepository: Repository<Whiteboard>,
    ) {}

    async create(
        input: CreateWhiteboardInput,
    ): Promise<CreatedWhiteboardResponse> {
        const existingWhiteboard = await this.findByName(input.name);

        if (existingWhiteboard) {
            throw new ConflictException(
                `Whiteboard with the name: ${input.name} already exists`,
            );
        }

        const whiteboard = this.whiteboardsRepository.create(input);
        this.whiteboardsRepository.save(whiteboard);

        return {
            id: whiteboard.id,
            message: 'Whiteboard created successfully',
        };
    }

    async updateMetadata(
        input: UpdateWhiteboardMetadataInput,
    ): Promise<UpdatedWhiteboardMetadataResponse> {
        const { id, ...updatedData } = input;

        return this.updateWhiteboardPartial(
            id,
            updatedData,
            'Whiteboard metadata updated successfully',
        );
    }

    async updateElements(
        input: UpdateWhiteboardElementsInput,
    ): Promise<UpdatedWhiteboardElementsResponse> {
        const { id, ...updatedData } = input;

        return this.updateWhiteboardPartial(
            id,
            updatedData,
            'Whiteboard elements updated successfully',
        );
    }

    async delete(
        input: DeleteWhiteboardInput,
    ): Promise<DeletedWhiteboardResponse> {
        const existingWhiteboard = await this.findById(input.id);

        if (existingWhiteboard) {
            throw new NotFoundException(
                `Whiteboard with the id: ${input.id} was not found`,
            );
        }

        this.whiteboardsRepository.delete(input.id);

        return {
            id: input.id,
            message: 'Whiteboard deleted successfully',
        };
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

    private async updateWhiteboardPartial<T>(
        id: string,
        data: T,
        successMessage: string,
    ): Promise<{ id: string; message: string }> {
        const currentWhiteboard = await this.findById(id);
        if (!currentWhiteboard) {
            throw new NotFoundException(
                `Whiteboard with the id: ${id} was not found`,
            );
        }

        await this.whiteboardsRepository.update(
            id,
            data as QueryDeepPartialEntity<Whiteboard>,
        );

        return {
            id,
            message: successMessage,
        };
    }
}
