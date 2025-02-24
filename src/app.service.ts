import { Injectable, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService) {}
  // @MessagePattern('test-topic') // Topic you're subscribing to
  // consumeKafkaMessage(message: any) {
  //   console.log('Received Kafka message:', message);
  //   // Handle your logic here
  //   this.usersService.create(message);
  // }
  getHello(){
    return "Hello Nest JS Project"
  }
}
