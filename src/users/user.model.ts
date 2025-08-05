import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Whiteboard } from 'src/whiteboards/whiteboards.model';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ unique: true })
    username: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Field(() => [Whiteboard], { nullable: true })
    @OneToMany(() => Whiteboard, (whiteboard) => whiteboard.userId)
    whiteboards: Whiteboard[];
}
