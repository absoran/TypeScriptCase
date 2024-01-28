
import {Repository} from "typeorm";
import {ProductVariant} from "../Model/product-variant.ts";
import {AppDataSource} from "../data-source.ts";
import {DatabaseError} from "../Model/errors.ts";
import {IProductVariantRepository} from "./product-variant-repo-interface.ts";

export class ProductVariantRepository implements IProductVariantRepository{
    private productVariantRepository: Repository<ProductVariant>

    constructor() {
        this.productVariantRepository = AppDataSource.getRepository(ProductVariant);
    }

    async createProductVariant(productVariantData: Partial<ProductVariant>): Promise<ProductVariant> {
        try {
            const newProductVariant = this.productVariantRepository.create(productVariantData);
            return await this.productVariantRepository.save(newProductVariant);
        } catch (error) {
            throw  new DatabaseError(`Error getting createProductVariant: ${(error as Error).message}`);
        }
    }

    async getVariantsByProductId(productId: number): Promise<ProductVariant[] | null> {
        try {
            return await this.productVariantRepository.createQueryBuilder("product_variant").where("product_variant.product_id = :id",{id: productId}).getMany()

        } catch (error) {
            throw  new DatabaseError(`Error getting products: ${(error as Error).message}`);
        }
    }

    async updateProductVariant(id: number, updatedData: Partial<ProductVariant>): Promise<ProductVariant | null> {
        try {
            await this.productVariantRepository.update(id, updatedData);
            return null
        } catch (error) {
            throw  new DatabaseError(`Error updating product: ${(error as Error).message}`);
        }
    }

    async deleteProductVariant(id: number): Promise<void> {
        try {
            await this.productVariantRepository.delete(id);
        } catch (error) {
            throw  new DatabaseError(`Error deleting product: ${(error as Error).message}`);
        }
    }
}