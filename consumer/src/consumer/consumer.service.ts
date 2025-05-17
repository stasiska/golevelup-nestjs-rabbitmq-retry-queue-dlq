import { AmqpConnection, Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';

@Injectable()
export class ConsumerService {
    constructor(private readonly amqpConnection: AmqpConnection) { }

    @RabbitSubscribe({
        exchange: 'main_exchange',
        routingKey: 'bill.created',
        queue: 'bill-queue',

        queueOptions: {
            durable: true,
            deadLetterExchange: 'retry_exchange',
            deadLetterRoutingKey: 'bill.retry',
        },
    })//
    async handleMessage(msg: any, amqpMsg: ConsumeMessage) {
        const retryCount = parseInt(amqpMsg.properties.headers['x-death']?.[0]?.count || '0');
        try {
            if (msg.consumer === 'FailUser') {
                console.log('Simulated failure - sending to retry queue');
                throw new Error('Simulated failure');
            }
            console.log('✅ Processed successfully', msg);
            return ;
        } catch (err) {
            if (retryCount < 5) {
                console.warn(`⏳ Retry attempt ${retryCount + 1} for message...`);
                return new Nack(false);
            } else {
                console.error(`💥 Max retries reached. Skipping and acking.`);
                await this.amqpConnection.publish('dlx_exchange', 'bill.created', msg);
                return;
            }
        }


    }


}
