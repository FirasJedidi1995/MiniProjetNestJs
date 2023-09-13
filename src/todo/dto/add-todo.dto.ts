import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AddTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: `la taille minimale du champs name est de 6 caractéres`,
  })
  @MaxLength(25)
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  description: string;
}
