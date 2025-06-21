import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ExcalidrawElement } from '@excalidraw/excalidraw/dist/types/excalidraw/element/types';

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

    @Field(() => [String], { nullable: true })
    @Column('json', { nullable: true })
    elements: ExcalidrawElement[];
}
