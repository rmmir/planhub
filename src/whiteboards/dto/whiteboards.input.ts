import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { ExcalidrawElement } from '@excalidraw/excalidraw/dist/types/excalidraw/element/types';

@InputType()
export class CreateWhiteboardInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field({ nullable: true })
    @IsString()
    description?: string;

    @Field({ nullable: true })
    @IsString()
    elements?: ExcalidrawElement[];
}

@InputType()
export class UpdateWhiteboardMetadataInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    id: string;

    @Field({ nullable: true })
    @IsString()
    name?: string;

    @Field({ nullable: true })
    @IsString()
    description?: string;
}

@InputType()
export class UpdateWhiteboardElementsInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    id: string;

    @Field()
    @IsString()
    elements: ExcalidrawElement[];
}

@InputType()
export class DeleteWhiteboardInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    id: string;
}
