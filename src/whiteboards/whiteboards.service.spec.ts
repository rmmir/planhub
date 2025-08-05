import { Test } from '@nestjs/testing';
import { WhiteboardsService } from './whiteboards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
    CreateWhiteboardInput,
    DeleteWhiteboardInput,
    UpdateWhiteboardElementsInput,
    UpdateWhiteboardMetadataInput,
} from './dto/whiteboards.input';

const mockRepository = () => ({
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
});

const mockWhiteboard = {
    id: '1',
    name: 'Test Board',
    elements: [],
    metadata: {},
};

const mockUserId = '123';

describe('WhiteboardsService', () => {
    let service: WhiteboardsService;
    let repository: ReturnType<typeof mockRepository>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                WhiteboardsService,
                {
                    provide: getRepositoryToken(
                        require('./whiteboards.model').Whiteboard,
                    ),
                    useFactory: mockRepository,
                },
            ],
        }).compile();

        service = module.get(WhiteboardsService);
        repository = module.get(
            getRepositoryToken(require('./whiteboards.model').Whiteboard),
        );
    });

    describe('create', () => {
        it('should create a whiteboard', async () => {
            repository.findOneBy.mockResolvedValue(null);
            repository.create.mockReturnValue({ ...mockWhiteboard });
            repository.save.mockResolvedValue({ ...mockWhiteboard });

            const input = { name: 'Test Board' };
            const result = await service.create(
                input as CreateWhiteboardInput,
                mockUserId,
            );

            expect(repository.create).toHaveBeenCalledWith(input);
            expect(repository.save).toHaveBeenCalled();
            expect(result).toEqual({
                id: mockWhiteboard.id,
                message: 'Whiteboard created successfully',
            });
        });

        it('should throw ConflictException if name exists', async () => {
            repository.findOneBy.mockResolvedValue(mockWhiteboard);

            await expect(
                service.create(
                    { name: 'Test Board' } as CreateWhiteboardInput,
                    mockUserId,
                ),
            ).rejects.toThrow(
                'Whiteboard with the name: Test Board already exists',
            );
        });
    });

    describe('updateMetadata', () => {
        it('should update metadata', async () => {
            const input: UpdateWhiteboardMetadataInput = {
                id: '1',
                name: 'name',
                description: 'desc',
            };
            repository.findOneBy.mockResolvedValue(mockWhiteboard);
            repository.update.mockResolvedValue({});

            const result = await service.updateMetadata(input, mockUserId);

            expect(repository.update).toHaveBeenCalledWith('1', {
                name: 'name',
                description: 'desc',
            });
            expect(result).toEqual({
                id: '1',
                message: 'Whiteboard metadata updated successfully',
            });
        });

        it('should throw NotFoundException if not found', async () => {
            repository.findOneBy.mockResolvedValue(null);

            await expect(
                service.updateMetadata({ id: '2', name: 'test' }, mockUserId),
            ).rejects.toThrow('Whiteboard with the id: 2 was not found');
        });
    });

    describe('updateElements', () => {
        it('should update elements', async () => {
            const input: UpdateWhiteboardElementsInput = {
                id: '1',
                elements: {} as any,
            };
            repository.findOneBy.mockResolvedValue(mockWhiteboard);
            repository.update.mockResolvedValue({});

            const result = await service.updateElements(
                input as any,
                mockUserId,
            );

            expect(repository.update).toHaveBeenCalledWith('1', {
                elements: {},
            });
            expect(result).toEqual({
                id: '1',
                message: 'Whiteboard elements updated successfully',
            });
        });

        it('should throw NotFoundException if not found', async () => {
            repository.findOneBy.mockResolvedValue(null);

            await expect(
                service.updateElements(
                    { id: '2', elements: [] } as any,
                    mockUserId,
                ),
            ).rejects.toThrow('Whiteboard with the id: 2 was not found');
        });
    });

    describe('delete', () => {
        it('should throw NotFoundException if not found', async () => {
            const input: DeleteWhiteboardInput = { id: '2' };
            repository.findOneBy.mockResolvedValue(null);

            await expect(service.delete(input, mockUserId)).rejects.toThrow(
                'Whiteboard with the id: 2 was not found',
            );
        });

        it('should delete whiteboard', async () => {
            const input: DeleteWhiteboardInput = { id: '1' };
            repository.findOneBy.mockResolvedValue(mockWhiteboard);
            repository.delete.mockResolvedValue({});

            const result = await service.delete(input, mockUserId);

            expect(repository.delete).toHaveBeenCalledWith('1');
            expect(result).toEqual({
                id: '1',
                message: 'Whiteboard deleted successfully',
            });
        });
    });

    describe('findAll', () => {
        it('should return all whiteboards', async () => {
            repository.find.mockResolvedValue([mockWhiteboard]);

            const result = await service.findAll();

            expect(result).toEqual([mockWhiteboard]);
        });
    });

    describe('findById', () => {
        it('should return a whiteboard by id', async () => {
            repository.findOneBy.mockResolvedValue(mockWhiteboard);

            const result = await service.findById('1');

            expect(result).toEqual(mockWhiteboard);
        });

        it('should return null if not found', async () => {
            repository.findOneBy.mockResolvedValue(null);

            const result = await service.findById('2');

            expect(result).toBeNull();
        });
    });

    describe('findByName', () => {
        it('should return a whiteboard by name', async () => {
            repository.findOneBy.mockResolvedValue(mockWhiteboard);

            const result = await service.findByName('Test Board');

            expect(result).toEqual(mockWhiteboard);
        });

        it('should return null if not found', async () => {
            repository.findOneBy.mockResolvedValue(null);

            const result = await service.findByName('Unknown');

            expect(result).toBeNull();
        });
    });
});
