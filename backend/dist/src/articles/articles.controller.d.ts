import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    create(createArticleDto: CreateArticleDto): Promise<{
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
    findAll(categoryId?: string, isFavorite?: string): Promise<({
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
    findOne(id: string): Promise<{
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
    update(id: string, updateArticleDto: UpdateArticleDto): Promise<{
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
    remove(id: string): Promise<{
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
    partialUpdate(id: string, updateArticleDto: UpdateArticleDto): Promise<{
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
}
