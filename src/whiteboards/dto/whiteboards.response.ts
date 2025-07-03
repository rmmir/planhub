import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class BasicResponse {
    @Field()
    id: string;

    @Field()
    message: string;
}

@ObjectType()
export class CreatedWhiteboardResponse extends BasicResponse {} 

@ObjectType()
export class UpdatedWhiteboardMetadataResponse extends BasicResponse {}

@ObjectType()
export class UpdatedWhiteboardElementsResponse extends BasicResponse {}

@ObjectType()
export class DeletedWhiteboardResponse extends BasicResponse {}
