import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateDuplicateModuleDto { 
    @ApiProperty({ example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({ example: 'example' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'this is an example' })
    @IsString()
    description: string;
}