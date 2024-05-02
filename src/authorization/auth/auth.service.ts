import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserRecoverDto } from './dto/recover-user.dto';
import { PasswordResetToken } from '../user/entities/password-reset-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private model: Repository<User>,
    @InjectRepository(PasswordResetToken)
    private passwordResetTokenRepository: Repository<PasswordResetToken>,
    private readonly i18n: I18nService,
  ) {}

  async create(userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);
    const payload = { email: user.email, user_id: user.id };
    const access_token = this.jwtService.sign(payload);
    return { ...user, token: access_token };
  }
  async login(userDto: LoginUserDto) {
    const { email, password } = userDto;
    const user = await this.userService.login(email);
    if (!user)
      throw new UnauthorizedException(
        this.i18n.translate('auth.invalid_credentials'),
      );
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      throw new UnauthorizedException(
        this.i18n.translate('auth.invalid_credentials'),
      );
    const payload = { email: user.email, user_id: user.id };
    const access_token = this.jwtService.sign(payload);
    delete user.password;
    return {
      ...user,
      token: access_token,
    };
  }

  async createPasswordResetToken(
    userRecover: UserRecoverDto,
  ): Promise<PasswordResetToken> {
    const user = await this.model.findOne({
      where: { email: userRecover.email },
      select: ['email', 'id'],
    });

    if (!user) {
      throw new NotFoundException(this.i18n.translate('auth.user_not_found'));
    }
    const payload = { email: user.email, user_id: user.id };

    const token = this.jwtService.sign(payload);
    const expirationDate = new Date();
    const HOURS_TO_EXPIRE =1;
    expirationDate.setHours(expirationDate.getHours() + HOURS_TO_EXPIRE); // Token expires in 1 hour.

    const passwordResetToken = this.passwordResetTokenRepository.create({
      token,
      expirationDate,
      user,
    });

    return this.passwordResetTokenRepository.save(passwordResetToken);
  }

  async resetPassword(token: string, newPassword: string): Promise<any> {
    if (!this.jwtService.verify(token)) {
      throw new Error(this.i18n.translate('auth.invalid_token'));
    }
    const passwordResetToken = await this.passwordResetTokenRepository.findOne({
      where: { token },

      relations: {
        user: true,
      },
    });

    if (!passwordResetToken || !passwordResetToken.user) {
      throw new Error(this.i18n.translate('auth.invalid_token'));
    }

    const user = passwordResetToken.user;
    user.password = await bcrypt.hash(
      newPassword,
      +process.env.JWT_SALT_OR_ROUNDS,
    );
    await this.model.save(user);

    await this.passwordResetTokenRepository.softRemove(passwordResetToken);
    const payload = { email: user.email, user_id: user.id };
    const access_token = this.jwtService.sign(payload);
    return {
      user: { id: user.id, name: user.name, email: user.email },
      token: access_token,
    };
  }
}
