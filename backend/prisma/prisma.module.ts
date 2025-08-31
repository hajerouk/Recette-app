// prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // optionnel → rend PrismaService dispo partout sans réimport
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
