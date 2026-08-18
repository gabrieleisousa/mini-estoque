import 'dotenv/config'
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        const adapter = new PrismaMariaDb(process.env.DATABASE_URL!, {
            useTextProtocol: true
        });

        super({ adapter })
    }

    async onModuleInit() {
        await this.$connect();
    }
}
