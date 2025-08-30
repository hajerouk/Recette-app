// prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // optionnel, si tu veux que Prisma soit disponible partout
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // pour pouvoir l’injecter dans d’autres modules
})
export class PrismaModule {}
