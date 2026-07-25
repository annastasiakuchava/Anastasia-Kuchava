import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  createUser(userData: Omit<User, 'id'>): User {
    const newUser: User = {
      id: this.idCounter++,
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updateData: Partial<Omit<User, 'id'>>): User {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users[index] = { ...this.users[index], ...updateData };
    return this.users[index];
  }

  deleteUser(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(index, 1);
    return { message: 'User deleted successfully' };
  }
}