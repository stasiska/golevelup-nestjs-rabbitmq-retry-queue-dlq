import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class BillqueueService {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  async publishBill(payload: any) {
    await this.amqpConnection.publish('main_exchange', 'bill.created', {consumer: 'sFailUser'});
  }
}
