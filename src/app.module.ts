import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseModule } from './purchase/purchase.module';
import { AuthModule } from './auth/auth.module';
import { KafkaModule } from './kafka/kafka.module';
import { MessageConsumer } from './kafka/Message.consumer';
import {GraphQLModule} from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest',
      // entities,
      synchronize: true,
      // retryAttempts:10,
      // retryDelay:1000,
      autoLoadEntities: true,
      migrationsRun: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // Generates GraphQL schema automatically
      playground: true, // Enables GraphQL Playground for testing
      
    }),
    UsersModule,
    PurchaseModule,
    AuthModule,
    // KafkaModule  
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // MessageConsumer
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   // .apply(cors(),helmet(),LoggerMiddleware)
    //   .apply(LoggerMiddleware)
    //   .forRoutes('dogs');
  }
}


