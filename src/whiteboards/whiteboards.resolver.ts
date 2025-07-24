import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Whiteboard } from './whiteboards.model';
import { WhiteboardsService } from './whiteboards.service';
import {
    CreateWhiteboardInput,
    DeleteWhiteboardInput,
    UpdateWhiteboardElementsInput,
    UpdateWhiteboardMetadataInput,
} from './dto/whiteboards.input';
import {
    CreatedWhiteboardResponse,
    UpdatedWhiteboardElementsResponse,
    UpdatedWhiteboardMetadataResponse,
} from './dto/whiteboards.response';

@UseGuards(JwtAuthGuard)
@Resolver()
export class WhiteboardsResolver {
    constructor(private whiteboardsService: WhiteboardsService) {}

    @Query(() => [Whiteboard])
    async getAll() {
        return await this.whiteboardsService.findAll();
    }

    @Query(() => Whiteboard)
    async getById(@Args('input') id: string) {
        return await this.whiteboardsService.findById(id);
    }

    @Mutation(() => CreatedWhiteboardResponse)
    async create(
        @Args('input') createWhiteboardInput: CreateWhiteboardInput,
        @Context() ctx,
    ) {
        return this.whiteboardsService.create(
            createWhiteboardInput,
            ctx.req.user.id,
        );
    }

    @Mutation(() => UpdatedWhiteboardMetadataResponse)
    async updateMetadata(
        @Args('input')
        updateWhiteboardMetadataInput: UpdateWhiteboardMetadataInput,
        @Context() ctx,
    ) {
        return this.whiteboardsService.updateMetadata(
            updateWhiteboardMetadataInput,
            ctx.req.user.id,
        );
    }

    @Mutation(() => UpdatedWhiteboardElementsResponse)
    async updateElements(
        @Args('input')
        updateWhiteboardElementsInput: UpdateWhiteboardElementsInput,
        @Context() ctx,
    ) {
        return this.whiteboardsService.updateElements(
            updateWhiteboardElementsInput,
            ctx.req.user.id,
        );
    }

    @Mutation(() => Whiteboard)
    async delete(
        @Args('input') deleteWhiteboardInput: DeleteWhiteboardInput,
        @Context() ctx,
    ) {
        return this.whiteboardsService.delete(
            deleteWhiteboardInput,
            ctx.req.user.id,
        );
    }
}
