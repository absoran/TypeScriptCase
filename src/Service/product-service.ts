import {Product} from '../Model/product';
import {IProductRepository} from "../Repository/product-repository-interface";
import {ProductRepository} from "../Repository/product-repository";

export class ProductService {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async createProduct(ProductData: Partial<Product>): Promise<Product> {
        try {
            return await this.productRepository.createProduct(ProductData);
        } catch (error) {
            throw new Error(`Error creating Product: ${(error as Error).message}`);
        }
    }

    async getProductById(id: number): Promise<Product | null> {
        try {
            return await this.productRepository.getProductById(id);
        } catch (error) {
            throw new Error(`Error getting Product by ID: ${(error as Error).message}`);
        }
    }

    async getAllEntities(): Promise<Product[] | null> {
        try {
            return await this.productRepository.getProducts();
        } catch (error) {

            throw new Error(`Error getting all Products: ${(error as Error).message}`);
        }
    }

    async updateProduct(id: number, updatedData: Partial<Product>): Promise<Product | null> {
        try {
            return await this.productRepository.updateProduct(id, updatedData);
        } catch (error) {
            throw new Error(`Error updating Product: ${(error as Error).message}`);
        }
    }

    async deleteProduct(id: number): Promise<void> {
        try {
            await this.productRepository.deleteProduct(id);
        } catch (error) {
            throw new Error(`Error deleting Product: ${(error as Error).message}`);
        }
    }
}