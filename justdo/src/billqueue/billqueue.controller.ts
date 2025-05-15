import { Controller, Get, Post } from "@nestjs/common";
import { BillqueueService } from "./billqueue.service";

@Controller('bill')
export class BillqueueController {
    constructor(private readonly billqueueService: BillqueueService) {}

    @Post('first')
    async emit() {
        return await this.billqueueService.publishBill({})
    }

    @Get()
    async send() {
        return {message: 'hello'}
    }
}