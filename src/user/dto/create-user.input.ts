import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Este campo nome não pode estar vazio' })
  @MinLength(5)
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Este campo e-mail não pode estar vazio' })
  @IsEmail()
  email: string;
}
