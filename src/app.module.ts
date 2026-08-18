import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutoModule } from './produto/produto.module';


@Module({
  imports: [PrismaModule, ProdutoModule],
})
export class AppModule {}
