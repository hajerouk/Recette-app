import { PrismaService } from 'prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticlesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateArticleDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        isFavorite: boolean;
        categoryId: number;
    }>;
    findAll(filters?: {
        categoryId?: number;
        isFavorite?: boolean;
    }): Promise<({
        category: {
            name: string;
            id: number;
        };
    } & {
        id: number;
        title: string;
        description: string | null;
        isFavorite: boolean;
        categoryId: number;
    })[]>;
    findOne(id: number): Promise<{
        category: {
            name: string;
            id: number;
        };
    } & {
        id: number;
        title: string;
        description: string | null;
        isFavorite: boolean;
        categoryId: number;
    }>;
    update(id: number, data: UpdateArticleDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        isFavorite: boolean;
        categoryId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        isFavorite: boolean;
        categoryId: number;
    }>;
}
