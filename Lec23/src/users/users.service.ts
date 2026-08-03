import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

export interface User {
  id: number;
  email: string;
  firstName: string;
  subscriptionStartDate: Date;
  subscriptionEndDate: Date;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1); // ავტომატურად +1 თვე

    const newUser: User = {
      id: Date.now(),
      ...createUserDto,
      subscriptionStartDate: startDate,
      subscriptionEndDate: endDate,
    };

    this.users.push(newUser);
    return newUser;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  upgradeSubscription(email: string) {
    const user = this.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User with this email not found');
    }

    // თუ უკვე ვადაგასულია, დღეიდან დავუმატოთ 1 თვე, თუ აქტიურია - ძველ ეშელონზე +1 თვე
    const currentEndDate = new Date(user.subscriptionEndDate);
    const now = new Date();

    const baseDate = currentEndDate > now ? currentEndDate : now;
    baseDate.setMonth(baseDate.getMonth() + 1);

    user.subscriptionEndDate = baseDate;

    return {
      message: 'Subscription successfully extended by 1 month',
      subscriptionEndDate: user.subscriptionEndDate,
    };
  }
}