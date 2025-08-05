import { Test, TestingModule } from '@nestjs/testing';
import { WhiteboardsResolver } from './whiteboards.resolver';

describe('WhiteboardsResolver', () => {
    let resolver: WhiteboardsResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WhiteboardsResolver],
        }).compile();

        resolver = module.get<WhiteboardsResolver>(WhiteboardsResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
