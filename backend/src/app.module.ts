import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ArticlesModule } from './articles/articles.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule, CategoriesModule, ArticlesModule],
})
export class AppModule {}
