import { DynamicModule, Module } from '@nestjs/common';
import { BillqueueService } from './billqueue.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BillqueueController } from './billqueue.controller';
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
  controllers: [BillqueueController],
  providers: [BillqueueService],
})
export class BillqueueModule { }
