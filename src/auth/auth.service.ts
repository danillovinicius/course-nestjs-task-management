import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.model';

@Injectable()
export class AuthService {

  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService) { }

  async signUp(credentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.signUp(credentialsDTO);
  }

  async signIn(credentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
    const username = await this.userRepository.signIn(credentialsDTO);

    if (!username) {
      this.logger.error(`User "${credentialsDTO.username}" not allowed.`);
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

}
