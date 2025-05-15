import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConsumerController } from './consumer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
        RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://localhost:5672',
      exchanges: [
        {
          name: 'main_exchange',
          type: 'direct',
        },
        {
          name: 'retry_exchange',
          type: 'direct',
        },
        {
          name: 'dlx_exchange',
          type: 'direct',
        },
      ],
      connectionInitOptions: { wait: true },
      channels: {
        'default': {
          prefetchCount: 1,
          default: true,
        },
      },
    }),
  ],
  controllers: [ConsumerController],
  providers: [ConsumerService],
})
export class ConsumerModule {}
