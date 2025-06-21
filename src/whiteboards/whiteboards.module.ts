import { Module } from '@nestjs/common';
import { WhiteboardsResolver } from './whiteboards.resolver';
import { WhiteboardsService } from './whiteboards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Whiteboard } from './whiteboards.model';

@Module({
    imports: [TypeOrmModule.forFeature([Whiteboard])],
    providers: [WhiteboardsResolver, WhiteboardsService],
    exports: [WhiteboardsService],
})
export class WhiteboardsModule {}
