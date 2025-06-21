import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Whiteboard } from './whiteboards.model';
import { Repository } from 'typeorm';

@Injectable()
export class WhiteboardsService {
    constructor(
        @InjectRepository(Whiteboard)
        private whiteboardsRepository: Repository<Whiteboard>,
    ) {}
}
