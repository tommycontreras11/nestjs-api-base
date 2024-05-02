import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
    @ApiProperty({ default: '123456' })
    @IsNotEmpty()
    @IsString()
    code_resource: string;
  
    @ApiProperty({ default: 'permission 1' })
    @IsString()
    name: string;

    @ApiProperty({ default: 'This is the permission 1' })
    @IsString()
    description: string;
}
