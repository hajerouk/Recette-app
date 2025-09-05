import { Controller, Get, Post, Put, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // Créer un article
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  // Lister les articles avec filtres optionnels
  @Get()
  async findAll(
    @Query('categoryId') categoryId?: string,
    @Query('isFavorite') isFavorite?: string,
  ) {
    const filters: { categoryId?: number; isFavorite?: boolean } = {};

    if (categoryId) {
      filters.categoryId = Number(categoryId);
    }
    if (isFavorite !== undefined) {
      filters.isFavorite = isFavorite === 'true';
    }

    return this.articlesService.findAll(filters);
  }

  // Récupérer un article par ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.articlesService.findOne(Number(id));
  }

  // Mettre à jour un article (PUT)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(Number(id), updateArticleDto);
  }

  // Supprimer un article
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.articlesService.remove(Number(id));
  }
  // PATCH partiel
@Patch(':id')
async partialUpdate(
  @Param('id') id: string,
  @Body() updateArticleDto: UpdateArticleDto,
) {
  return this.articlesService.update(+id, updateArticleDto);
}

}    

