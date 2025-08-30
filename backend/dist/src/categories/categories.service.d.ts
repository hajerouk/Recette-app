import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        articles: {
            id: number;
            title: string;
            description: string | null;
            isFavorite: boolean;
            categoryId: number;
        }[];
    } & {
        name: string;
        id: number;
    })[]>;
    findOne(id: number): Promise<{
        articles: {
            id: number;
            title: string;
            description: string | null;
            isFavorite: boolean;
            categoryId: number;
        }[];
    } & {
        name: string;
        id: number;
    }>;
    create(createCategoryDto: CreateCategoryDto): Promise<{
        name: string;
        id: number;
    }>;
}
