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
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ArticlesService = class ArticlesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const category = await this.prisma.category.findUnique({
            where: { id: data.categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${data.categoryId} not found`);
        }
        return this.prisma.article.create({
            data,
            include: { category: true },
        });
    }
    async findAll(filters) {
        const where = {};
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
    async findOne(id) {
        const article = await this.prisma.article.findUnique({
            where: { id },
            include: { category: true },
        });
        if (!article) {
            throw new common_1.NotFoundException(`Article with ID ${id} not found`);
        }
        return article;
    }
    async update(id, data) {
        const article = await this.prisma.article.findUnique({ where: { id } });
        if (!article) {
            throw new common_1.NotFoundException(`Article with ID ${id} not found`);
        }
        if (data.categoryId) {
            const category = await this.prisma.category.findUnique({
                where: { id: data.categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException(`Category with ID ${data.categoryId} not found`);
            }
        }
        return this.prisma.article.update({
            where: { id },
            data,
            include: { category: true },
        });
    }
    async remove(id) {
        const article = await this.prisma.article.findUnique({ where: { id } });
        if (!article) {
            throw new common_1.NotFoundException(`Article with ID ${id} not found`);
        }
        return this.prisma.article.delete({
            where: { id },
            include: { category: true },
        });
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map