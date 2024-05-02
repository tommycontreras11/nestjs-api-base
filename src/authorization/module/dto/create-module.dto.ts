import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ModuleEntity } from '../entities/module.entity';
import { BaseDTO } from '../../../common/dtos/base.dto';
export class CreateModuleDto extends BaseDTO {
  @ApiProperty({ default: 'User' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ default: 'This is the module of the users' })
  @IsString()
  description: string;

  @ApiProperty({ default: 1 })
  @IsNumber()
  parent_id?: ModuleEntity;
}
