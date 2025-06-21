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
    async getWhiteboards() {
        return Promise.resolve({} as Whiteboard);
        // await this.whiteboardsService.getWhiteboards();
    }

    @Query(() => Whiteboard)
    async getWhiteboardById(@Args('input') id: string) {
        return Promise.resolve({} as Whiteboard);
        // await this.whiteboardsService.getWhiteboardById(id);
    }

    @Mutation(() => Whiteboard)
    async create(@Args('input') createWhiteboardInput: CreateWhiteboardInput) {
        //return this.whiteboardsService.createWhiteboard(createWhiteboardInput);
    }

    @Mutation(() => Whiteboard)
    async updateMetadata(
        @Args('input')
        UpdateWhiteboardMetadataInput: UpdateWhiteboardMetadataInput,
    ) {
        //return this.whiteboardsService.createWhiteboard(createWhiteboardInput);
    }

    @Mutation(() => Whiteboard)
    async updateElements(
        @Args('input')
        UpdateWhiteboardElementsInput: UpdateWhiteboardElementsInput,
    ) {
        //return this.whiteboardsService.createWhiteboard(createWhiteboardInput);
    }

    @Mutation(() => Whiteboard)
    async delete(@Args('input') deleteWhiteboardInput: DeleteWhiteboardInput) {}
}
