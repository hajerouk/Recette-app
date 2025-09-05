import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Lister toutes les catégories
  @Get()
  async getAll() {
    return this.categoriesService.findAll();
  }

  // Créer une catégorie
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoriesService.create(createCategoryDto);
    } catch (error: any) {
      // Gestion de l'erreur d'unicité Prisma
      if (error.code === 'P2002') {
        throw new BadRequestException(
          `Category with name '${createCategoryDto.name}' already exists`,
        );
      }
      throw error;
    }
  }
}
