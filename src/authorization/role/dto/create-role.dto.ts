import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Role name',
    minimum: 5,
    default: 'admin',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Role Description',
    minimum: 5,
    default: 'admin to manage all sistem',
  })
  @IsString()
  description: string;
}
