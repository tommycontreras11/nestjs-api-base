import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsEmail } from 'class-validator';

export class UserRecoverDto {
  @ApiProperty({
    description: 'example@gmail.com',
    default: 'admin@admin.com',
  })
  @IsEmail()
  email: string;
}
