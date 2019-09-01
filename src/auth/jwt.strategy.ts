import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { jwtConfig } from '../config/jwt-key.config';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  private logger = new Logger('JwtStrategy');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      this.logger.error(`User "${user.username}" not allowed.`);
      throw new UnauthorizedException();
    }
    return user;
  }
}
