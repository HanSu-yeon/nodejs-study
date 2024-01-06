import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //리포지토리 주입 데코레이터
import { User } from './user.entity';
import { Repository } from 'typeorm'; //typeorm의 리포지토리로 저장, 읽기같은 기본 메서드 제공함. 사용시 엔티티 객체를 타입으로 추가해야 함

@Injectable() //이 데코레이터가 있으면 프로바이더가 된다
export class UserService {
  constructor(
    //리포지토리 주입
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  createUser(user): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUser(email: string) {
    const result = this.userRepository.findOne({ where: { email } });
    return result;
  }

  async updateUser(email, _user) {
    const user: User = await this.getUser(email);
    console.log(_user);
    user.username = _user.username;
    user.password = _user.password;
    console.log(user);
    this.userRepository.save(user);
  }

  deleteUser(email: any) {
    return this.userRepository.delete({ email: email });
  }

  async findByEmailOrSave(email, username, providerId): Promise<User> {
    const foundUser = await this.getUser(email);
    if (foundUser) {
      return foundUser;
    }

    const newUser = await this.userRepository.save({
      email,
      username,
      providerId,
    });
    return newUser;
  }
}
