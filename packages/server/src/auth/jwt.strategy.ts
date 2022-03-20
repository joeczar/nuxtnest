import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { TokenPayload } from './tokenPayload.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  async validate(payload: TokenPayload) {
    Logger.log('jwt - validate', { payload });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...returnUser } = await this.userService.getById(
      payload.userId,
    );
    Logger.log('jwt - validate', { returnUser });
    return returnUser;
  }
}
