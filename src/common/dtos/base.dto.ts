import { IsNumber, IsOptional } from 'class-validator';
import { User } from '../../authorization/user/entities/user.entity';

export class BaseDTO {
  @IsNumber()
  @IsOptional()
  user_create_id?: User;
  @IsOptional()
  @IsNumber()
  user_update_id?: User;
}
