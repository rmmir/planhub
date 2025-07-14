import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    email: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    password: string;
}

@InputType()
export class RegisterInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    username: string;

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
