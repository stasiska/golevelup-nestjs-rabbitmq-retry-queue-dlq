import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BillqueueModule } from './billqueue/billqueue.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BillqueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
