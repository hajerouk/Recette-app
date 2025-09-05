import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  // Lister toutes les catégories
  async findAll() {
    try {
      return await this.prisma.category.findMany({
        include: { articles: true }, // Inclure les articles liés si besoin
      });
    } catch (err) {
      throw new InternalServerErrorException('Erreur lors de la récupération des catégories');
    }
  }

  // Récupérer une catégorie par ID
  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { articles: true },
    });
    if (!category) throw new NotFoundException('Catégorie non trouvée');
    return category;
  }

  // Créer une nouvelle catégorie
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({
        data: { name: createCategoryDto.name },
      });
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw new BadRequestException(`Une catégorie avec le nom '${createCategoryDto.name}' existe déjà`);
      }
      throw new InternalServerErrorException('Erreur lors de la création de la catégorie');
    }
  }
}
