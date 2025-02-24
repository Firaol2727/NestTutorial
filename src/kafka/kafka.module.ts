import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { MessageConsumer } from './Message.consumer';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports :[UsersModule],
  providers: [ ConsumerService,MessageConsumer],
  exports:[ConsumerService]
})
export class KafkaModule {}
