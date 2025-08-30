import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  
  @Get()
  async findAll(
    @Query('categoryId') categoryId?: string,
    @Query('isFavorite') isFavorite?: string,
  ) {
    const filters: any = {};

    if (categoryId) {
      filters.categoryId = Number(categoryId);
    }
    if (isFavorite !== undefined) {
      filters.isFavorite = isFavorite === 'true'; // conversion string → boolean
    }

    return this.articlesService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
