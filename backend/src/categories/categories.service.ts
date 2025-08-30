import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.category.findMany({
        include: { articles: true }, // Inclure les articles liés si besoin
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Erreur lors de la récupération des catégories');
    }
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { articles: true },
    });
    if (!category) throw new NotFoundException('Catégorie non trouvée');
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({
        data: { name: createCategoryDto.name },
      });
    } catch (err: any) {
      console.error(err);
      if (err.code === 'P2002') {
        // Code Prisma pour violation de contrainte unique
        throw new BadRequestException('Une catégorie avec ce nom existe déjà');
      }
      throw new InternalServerErrorException('Erreur lors de la création de la catégorie');
    }
  }
}
