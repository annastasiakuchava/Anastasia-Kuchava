import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersQueryDto } from './dto/get-users-query.dto';

@Injectable()
export class UsersService {
  private users = [];

  create(createUserDto: CreateUserDto) {
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  findAll(query: GetUsersQueryDto) {
    const { page = 1, take = 30, gender, email } = query;

    let filtered = this.users;

    if (gender) {
      filtered = filtered.filter((u) => u.gender === gender);
    }

    if (email) {
      filtered = filtered.filter((u) => u.email.startsWith(email));
    }

    const start = (page - 1) * take;
    const end = start + take;

    return {
      data: filtered.slice(start, end),
      total: filtered.length,
      page,
      take,
    };
  }
}