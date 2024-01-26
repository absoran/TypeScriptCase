import { Repository } from 'typeorm';
import {Product} from "../Model/product";
import {AppDataSource} from "../data-source"
import {DatabaseError} from "../Model/errors";
import {IProductRepository} from "./product-repository-interface";

export class ProductRepository {
    private productRepository: Repository<Product>;

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
    }

    async createProduct(productData: Partial<Product>): Promise<Product> {
        try {
            const newProduct = this.productRepository.create(productData);
            return await this.productRepository.save(newProduct);
        } catch (error) {
            throw  new DatabaseError(`Error getting createProduct: ${(error as Error).message}`);
        }
    }

    async getProductById(id: number): Promise<Product | null> {
        try {
            return await this.productRepository.findOneBy({id:id})
        } catch (error) {
            throw  new DatabaseError(`Error getting productById: ${(error as Error).message}`);
        }
    }

    async getProducts(): Promise<Product[] | null> {
        try {
            return await this.productRepository.find()
        } catch (error) {
            throw  new DatabaseError(`Error getting products: ${(error as Error).message}`);
        }
    }

    async updateProduct(id: number, updatedData: Partial<Product>): Promise<Product | null> {
        try {
            await this.productRepository.update(id, updatedData);
            return null
        } catch (error) {
            throw  new DatabaseError(`Error updating product: ${(error as Error).message}`);
        }
    }

    async deleteProduct(id: number): Promise<void> {
        try {
            await this.productRepository.delete(id);
        } catch (error) {
            throw  new DatabaseError(`Error deleting product: ${(error as Error).message}`);
        }
    }
}
