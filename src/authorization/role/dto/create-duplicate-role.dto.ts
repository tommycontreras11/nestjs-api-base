import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDuplicateRoleDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  role_id: number;

  @ApiProperty({ example: 'admin' })
  @IsString()
  name: string;
}
