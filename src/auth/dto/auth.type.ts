import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { IsString } from 'class-validator';
@ObjectType()
export class AuthType {
  @Field(() => User)
  user: User;

  @IsString()
  tokens: string;
}
