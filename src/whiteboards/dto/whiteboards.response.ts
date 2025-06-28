import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreatedWhiteboardResponse {
    @Field()
    id: string;

    @Field()
    message: string;
}
