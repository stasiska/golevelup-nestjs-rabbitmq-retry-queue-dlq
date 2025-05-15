import { Module } from '@nestjs/common';
import { ConsumerModule } from './consumer/consumer.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [ConsumerModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
