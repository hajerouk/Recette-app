import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  // Créer un article
  async create(data: CreateArticleDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${data.categoryId} not found`);
    }

    return this.prisma.article.create({
      data,
      include: { category: true },
    });
  }

  // Lister les articles avec filtres optionnels
  async findAll(filters?: { categoryId?: number; isFavorite?: boolean }) {
    const where: any = {};

    if (filters?.categoryId) {
      where.categoryId = filters.categoryId;
    }
    if (filters?.isFavorite !== undefined) {
      where.isFavorite = filters.isFavorite;
    }

    return this.prisma.article.findMany({
      where,
      include: { category: true },
      orderBy: { id: 'desc' },
    });
  }

  // Récupérer un article par ID
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

  // Mettre à jour un article
  async update(id: number, data: UpdateArticleDto) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    // Si categoryId est fourni, vérifier que la catégorie existe
    if (data.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: data.categoryId },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${data.categoryId} not found`);
      }
    }

    return this.prisma.article.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  // Supprimer un article
  async remove(id: number) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return this.prisma.article.delete({
      where: { id },
      include: { category: true },
    });
  }
}
