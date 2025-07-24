import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ExcalidrawElement } from '@excalidraw/excalidraw/dist/types/excalidraw/element/types';
import { GraphQLJSONObject } from 'graphql-type-json';
import { User } from 'src/users/user.model';

@ObjectType()
@Entity()
export class Whiteboard {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ unique: true })
    name: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => GraphQLJSONObject, { nullable: true })
    @Column('jsonb', { nullable: true })
    elements: ExcalidrawElement[];

    @ManyToOne(() => User, (user) => user.whiteboards)
    @JoinColumn({ name: 'userId' })
    userId: string;
}
