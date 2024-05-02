import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from './decorators/get-user.decoractor';
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RequirePermissions } from './decorators/require.permissions.decoractor';
import { UserRecoverDto } from './dto/recover-user.dto';
import { NewPasswordDto } from './dto/reset-password.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { I18nService } from 'nestjs-i18n';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly i18n: I18nService,
  ) {}

  @Post('register')
  create(@Body() createUserDto: RegisterUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @UseGuards(ThrottlerGuard)
  @Throttle(5, 30)
  @Post('recover-password')
  recoverPassword(@Body() userRecover: UserRecoverDto) {
    return this.authService.createPasswordResetToken(userRecover);
  }
  @Post('reset-password')
  recoverPasswordToken(@Body() newPasswordDto: NewPasswordDto) {
    return this.authService.resetPassword(
      newPasswordDto.token,
      newPasswordDto.password,
    );
  }

  @RequirePermissions('USER_DELETE')
  @Get('private')
  routeprivate(@User() user): any {
    return this.i18n.translate('auth.invalid_credentials');
  }
}
