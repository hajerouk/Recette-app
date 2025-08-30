"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CategoriesService = class CategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        try {
            return await this.prisma.category.findMany({
                include: { articles: true },
            });
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException('Erreur lors de la récupération des catégories');
        }
    }
    async findOne(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: { articles: true },
        });
        if (!category)
            throw new common_1.NotFoundException('Catégorie non trouvée');
        return category;
    }
    async create(createCategoryDto) {
        try {
            return await this.prisma.category.create({
                data: { name: createCategoryDto.name },
            });
        }
        catch (err) {
            console.error(err);
            if (err.code === 'P2002') {
                throw new common_1.BadRequestException('Une catégorie avec ce nom existe déjà');
            }
            throw new common_1.InternalServerErrorException('Erreur lors de la création de la catégorie');
        }
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map