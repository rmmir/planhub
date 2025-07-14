import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ExcalidrawElement } from '@excalidraw/excalidraw/dist/types/excalidraw/element/types';
import { GraphQLJSONObject } from 'graphql-type-json';

const nameValidationMessage = 'Name must be at least 3 characters long';

@InputType()
export class CreateWhiteboardInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: nameValidationMessage })
    name: string;

    @Field({ nullable: true })
    @IsString()
    description?: string;

    @Field(() => [GraphQLJSONObject], { nullable: true })
    @IsString()
    @IsOptional()
    elements?: ExcalidrawElement[];
}

@InputType()
export class UpdateWhiteboardMetadataInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: nameValidationMessage })
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

    @Field(() => [GraphQLJSONObject])
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
