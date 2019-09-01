import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('/signup')
  signUp(@Body(ValidationPipe) credentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.authService.signUp(credentialsDTO);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) credentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
    return this.authService.signIn(credentialsDTO);
  }

}
