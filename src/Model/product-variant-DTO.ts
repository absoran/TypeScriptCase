import {ProductDTO} from "./product-DTO.ts";


export interface ProductVariantDTO{
    id : number;
    product_id: number;
    name : string;
    description : string;
}

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

