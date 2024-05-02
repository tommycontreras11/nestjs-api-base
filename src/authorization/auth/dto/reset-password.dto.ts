import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, Length } from 'class-validator';

export class NewPasswordDto {
  @ApiProperty({
    description: 'passord',
    default: 'Abc12345.',
  })
  @IsString()
  @Length(4, 20)
  password: string;

  @ApiProperty({
    description: 'passord',
    default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJfaWQiOjEsImlhdCI6MTY4MzU1ODQ5NywiZXhwIjoxNjgzNzMxMjk3fQ.azbpIe1IFqWItRlUjQ2LX4QE7MYilGmnkqAArApRegk',
  })
  @IsString()
  @Length(20, 200)
  token: string;
}
