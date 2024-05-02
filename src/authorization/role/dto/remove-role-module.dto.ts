import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class RemoveRoleModuleDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  role_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  module_id: number;
}
