import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Matches } from 'class-validator';
import { User } from '../entities/user.entity';
import { BaseDTO } from '../../../common/dtos/base.dto';

export class CreateUserDto extends BaseDTO {
  @ApiProperty({
    description: 'name',
    minimum: 5,
    default: 'Miguel Perez',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'example@gmail.com',
    default: 'test1@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'passord',
    default: 'Abc12345',
  })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @ApiProperty({
    description: 'User supervisor',
    default: 1,
  })
  @IsNumber()
  parent_id?: User;

}
