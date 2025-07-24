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
        userId: string,
    ): Promise<CreatedWhiteboardResponse> {
        await this.checkUserExists(userId);

        const existingWhiteboard = await this.findByName(input.name);
        if (existingWhiteboard) {
            throw new ConflictException(
                `Whiteboard with the name "${input.name}" already exists`,
            );
        }

        const whiteboard = this.whiteboardsRepository.create({
            ...input,
            userId,
        });
        const result = await this.whiteboardsRepository.save(whiteboard);

        return {
            id: result.id,
            message: 'Whiteboard created successfully',
        };
    }

    async updateMetadata(
        input: UpdateWhiteboardMetadataInput,
        userId: string,
    ): Promise<UpdatedWhiteboardMetadataResponse> {
        await this.checkUserExists(userId);

        const { id, ...updatedData } = input;

        return this.updateWhiteboardPartial(
            id,
            { ...updatedData, userId },
            'Whiteboard metadata updated successfully',
        );
    }

    async updateElements(
        input: UpdateWhiteboardElementsInput,
        userId: string,
    ): Promise<UpdatedWhiteboardElementsResponse> {
        await this.checkUserExists(userId);

        const { id, ...updatedData } = input;

        return this.updateWhiteboardPartial(
            id,
            { ...updatedData, userId },
            'Whiteboard elements updated successfully',
        );
    }

    async delete(
        input: DeleteWhiteboardInput,
        userId: string,
    ): Promise<DeletedWhiteboardResponse> {
        await this.checkUserExists(userId);

        const existingWhiteboard = await this.findById(input.id);
        const deleteResult = await this.whiteboardsRepository.delete(
            existingWhiteboard.id,
        );
        if (!deleteResult.affected || deleteResult.affected === 0) {
            throw new NotFoundException(
                `Whiteboard with id "${existingWhiteboard.id}" could not be deleted or was not found`,
            );
        }

        return {
            id: input.id,
            message: 'Whiteboard deleted successfully',
        };
    }

    async findAll(): Promise<Whiteboard[]> {
        const whiteboards = await this.whiteboardsRepository.find();
        return whiteboards;
    }

    async findById(id: string): Promise<Whiteboard> {
        const existingWhiteboard = await this.whiteboardsRepository.findOneBy({
            id,
        });

        if (!existingWhiteboard) {
            throw new NotFoundException(
                `Whiteboard with the id "${id}" was not found`,
            );
        }

        return existingWhiteboard;
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
        const updateResult = await this.whiteboardsRepository.update(
            currentWhiteboard.id,
            data as QueryDeepPartialEntity<Whiteboard>,
        );
        if (!updateResult.affected || updateResult.affected === 0) {
            throw new NotFoundException(
                `Whiteboard with id "${currentWhiteboard.id}" could not be updated or was not found`,
            );
        }

        return {
            id,
            message: successMessage,
        };
    }

    private async checkUserExists(userId: string): Promise<void> {
        if (!userId) {
            throw new ConflictException(
                'User ID is required to create a whiteboard',
            );
        }

        const user = await this.whiteboardsRepository.manager.findOne('User', {
            where: { id: userId },
        });
        if (!user) {
            throw new NotFoundException(`User with ID "${userId}" not found`);
        }
    }
}
