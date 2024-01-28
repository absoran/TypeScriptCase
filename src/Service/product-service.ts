import {Product} from '../Model/product';
import {ProductRepository} from "../Repository/product-repository";
import {CreateProductDTO, UpdateProductDTO} from "../Model/product-DTO";
import {ProductVariantRepository} from "../Repository/product-variant-repository.ts";
import {CreateProductVariantDTO, UpdateProductVariantDTO} from "../Model/product-variant-DTO.ts";
import {ProductVariant} from "../Model/product-variant.ts";

// ProductService class takes repository as constructor parameter for dependency injection
// ProductService errors wrapped and handled with error model
export class ProductService {
    private productRepository: ProductRepository;
    private productVariantRepository: ProductVariantRepository;

    constructor(productRepository: ProductRepository, productVariantRepository: ProductVariantRepository) {
        this.productRepository = productRepository;
        this.productVariantRepository = productVariantRepository;
    }

    async createProduct(ProductData: CreateProductDTO): Promise<Product> {
        try {
            return await this.productRepository.createProduct(ProductData);
        } catch (error) {
            throw new Error(`Error creating Product: ${(error as Error).message}`);
        }
    }

    async createProductVariant(productVariantData: CreateProductVariantDTO): Promise<ProductVariant> {
        try {
            return await this.productVariantRepository.createProductVariant(productVariantData);
        } catch (error) {
            throw new Error(`Error creating ProductVariant: ${(error as Error).message}`);
        }
    }

    async getProductById(id: number): Promise<Product | null> {
        try {
            let product = await this.productRepository.getProductById(id);

            const variants = await this.productVariantRepository.getVariantsByProductId(id);
            if (variants != null) {
                // ts ignored because null check is done
                // @ts-ignore
                product.variants = variants;
            }
            return product
        } catch (error) {
            throw new Error(`Error getting Product by ID: ${(error as Error).message}`);
        }
    }

    async getAllProducts(): Promise<Product[] | null> {
        try {
            return await this.productRepository.getProducts();
        } catch (error) {

            throw new Error(`Error getting all Products: ${(error as Error).message}`);
        }
    }

    async updateProduct(id: number, updatedData: UpdateProductDTO): Promise<Product | null> {
        try {
            return await this.productRepository.updateProduct(id, updatedData);
        } catch (error) {
            throw new Error(`Error updating Product: ${(error as Error).message}`);
        }
    }

    async updateProductVariant(id: number, updatedData: UpdateProductVariantDTO): Promise<ProductVariant | null> {
        try {
            return await this.productVariantRepository.updateProductVariant(id, updatedData);
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

    async deleteProductVariant(id: number): Promise<void> {
        try {
            await this.productVariantRepository.deleteProductVariant(id);
        } catch (error) {
            throw new Error(`Error deleting Product: ${(error as Error).message}`);
        }
    }
}