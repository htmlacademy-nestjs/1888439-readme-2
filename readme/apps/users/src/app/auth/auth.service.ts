import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user.entity';
import { UserRepository } from '../user.repository';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constants';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';


@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register({name, email, password}: CreateUserDTO) {
    const existsUser = await this.userRepository.findByEmail(email);
    if (existsUser) {
      throw new Error(AUTH_USER_EXISTS);
    }

    const newUserEntity = await (new UserEntity({
      name,
      email,
      password: '',
      subscribers: 0,
      posts: 0,
      createdAt: new Date(),
    })).setPassword(password);

    return this.userRepository.create(newUserEntity);
  }

  async verifyUser({email, password}: LoginUserDTO) {
    const existsUser = await this.userRepository.findByEmail(email);

    if (!existsUser) {
      throw new Error(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existsUser);
    if (!await userEntity.checkPassword(password)) {
      throw new Error(AUTH_USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }

  async get(id: string) {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error(AUTH_USER_NOT_FOUND);
    }

    return existingUser;
  }
}
