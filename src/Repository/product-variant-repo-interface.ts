import {ProductVariant} from "../Model/product-variant.ts";

export interface IProductVariantRepository{
    createProductVariant(productVariantData: Partial<ProductVariant>): Promise<ProductVariant>
    getVariantsByProductId(id:number): Promise<ProductVariant[] | null>
    updateProductVariant(id: number, updatedData: Partial<ProductVariant>): Promise<ProductVariant | null>
    deleteProductVariant(id: number): Promise<void>
}