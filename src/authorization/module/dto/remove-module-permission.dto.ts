import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class RemoveModulePermissionDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    module_id: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    permission_id: number;
}