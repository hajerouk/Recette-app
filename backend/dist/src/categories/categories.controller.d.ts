import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getAll(): Promise<({
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
    create(createCategoryDto: CreateCategoryDto): Promise<{
        name: string;
        id: number;
    }>;
}
