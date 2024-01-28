import {Product} from "../Model/product";

// IProductRepository interface will be implemented in repository layer
export interface IProductRepository {
    createProduct(productData: Partial<Product>): Promise<Product>
    getProductById(id: number): Promise<Product | null>
    getProducts(): Promise<Product[] | null>
    updateProduct(id: number, updatedData: Partial<Product>): Promise<Product | null>
    deleteProduct(id: number): Promise<void>
}