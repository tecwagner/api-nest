import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Este campo nome não pode estar vazio' })
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty({ message: 'Este campo e-mail não pode estar vazio' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty({ message: 'Este campo senha não pode estar vazio' })
  @IsOptional()
  password: string;
}
