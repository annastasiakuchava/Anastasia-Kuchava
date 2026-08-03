import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const email = request.headers['x-user-email'] || request.headers['email'];

    if (!email) {
      request.isSubscribed = false;
      return true; // ერორი არ უნდა დაარტყას!
    }

    const user = this.usersService.findByEmail(email as string);

    if (user && new Date(user.subscriptionEndDate) > new Date()) {
      request.isSubscribed = true;
    } else {
      request.isSubscribed = false;
    }

    return true; // ყოველთვის უშვებს, უბრალოდ request-ზე ამატებს სტატუსს
  }
}