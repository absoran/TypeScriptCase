import {ProductDTO} from "./product-DTO.ts";

// ProductVariantDTO will be used as base DTO for other variant DTO's
export interface ProductVariantDTO{
    id : number;
    product_id: number;
    name : string;
    description : string;
}

// CreateProductVariantDTO used in CreateProductVariant endpoint, user do not need access internal fields like created_at, updated_at etc
export class CreateProductVariantDTO implements Omit<ProductVariantDTO, "id">{
    product_id : number;
    name : string;
    description : string;
    constructor({name,description,product_id} : Omit<ProductVariantDTO, "id">) {
        this.product_id = product_id;
        this.name = name;
        this.description = description;
    }
}

// UpdateProductVariantDTO used in UpdateProductVariant endpoint, user do not need access internal fields like created_at, updated_at etc
export class UpdateProductVariantDTO implements Partial<ProductVariantDTO>{
    id : number | undefined;
    name : string | undefined;
    description : string | undefined;
    constructor({id,name,price,stock_count,description} : Partial<ProductDTO>) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

