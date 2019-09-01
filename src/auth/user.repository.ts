import { EntityRepository, MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends MongoRepository<User> {

  readonly USERNAME_DUPLICATED_CODE = 11000;

  async signUp(credentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = credentialsDTO;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === this.USERNAME_DUPLICATED_CODE) {
        throw new ConflictException('Username já cadastrado...');
      }
      throw new InternalServerErrorException(error.errmsg);
    }

  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signIn(credentialsDTO: AuthCredentialsDTO): Promise<string> {
    const { username, password } = credentialsDTO;
    const user = await this.findOne({ username });

    if (user && await user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }
}
