import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'example@gmail.com',
    default: 'admin@admin.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'passoword',
    default: 'admin',
  })
  @IsString()
  @Length(4, 20)
  password: string;
}
