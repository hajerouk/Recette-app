import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateArticleDto) {
    // Vérifier si la catégorie existe
    const category = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${data.categoryId} not found`,
      );
    }

    return this.prisma.article.create({ data });
  }

 async findAll(filters?: { categoryId?: number; isFavorite?: boolean }) {
  const where: any = {};

  // Appliquer les filtres si fournis
  if (filters?.categoryId) {
    where.categoryId = filters.categoryId;
  }
  if (filters?.isFavorite !== undefined) {
    where.isFavorite = filters.isFavorite;
  }

  return this.prisma.article.findMany({
    where,
    include: { category: true },
    orderBy: { id: 'desc' }, // optionnel : pour avoir les plus récents en premier
  });
}


  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return article;
  }

  async update(id: number, data: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.article.delete({
      where: { id },
    });
  }
}
