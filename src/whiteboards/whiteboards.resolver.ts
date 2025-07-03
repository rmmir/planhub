import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { WhiteboardsService } from './whiteboards.service';
import { Query } from '@nestjs/graphql';
import { Whiteboard } from './whiteboards.model';
import {
    CreateWhiteboardInput,
    DeleteWhiteboardInput,
    UpdateWhiteboardElementsInput,
    UpdateWhiteboardMetadataInput,
} from './dto/whiteboards.input';

@Resolver()
export class WhiteboardsResolver {
    constructor(private whiteboardsService: WhiteboardsService) {}

    @Query(() => [Whiteboard])
    async getAll() {
        await this.whiteboardsService.findAll();
    }

    @Query(() => Whiteboard)
    async getById(@Args('input') id: string) {
        await this.whiteboardsService.findById(id);
    }

    @Mutation(() => Whiteboard)
    async create(@Args('input') createWhiteboardInput: CreateWhiteboardInput) {
        return this.whiteboardsService.create(createWhiteboardInput);
    }

    @Mutation(() => Whiteboard)
    async updateMetadata(
        @Args('input')
        updateWhiteboardMetadataInput: UpdateWhiteboardMetadataInput,
    ) {
        return this.whiteboardsService.updateMetadata(updateWhiteboardMetadataInput);
    }

    @Mutation(() => Whiteboard)
    async updateElements(
        @Args('input')
        updateWhiteboardElementsInput: UpdateWhiteboardElementsInput,
    ) {
        return this.whiteboardsService.updateElements(updateWhiteboardElementsInput);
    }

    @Mutation(() => Whiteboard)
    async delete(@Args('input') deleteWhiteboardInput: DeleteWhiteboardInput) {
        return this.whiteboardsService.delete(deleteWhiteboardInput);
    }
}
