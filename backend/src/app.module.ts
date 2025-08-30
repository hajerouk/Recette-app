import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [CategoriesModule, ArticlesModule],
})
export class AppModule {}
