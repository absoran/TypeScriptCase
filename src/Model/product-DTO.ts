import {Product} from "./product";

export interface ProductDTO{
    id : number;
    name : string;
    description : string;
    price : number;
    stock_count : number;
}

export class UpdateProductDTO implements Partial<ProductDTO>{
    id : number | undefined;
    name : string | undefined;
    price : number | undefined;
    stock_count : number | undefined;
    description : string | undefined;


    constructor({id,name,price,stock_count,description} : Partial<ProductDTO>) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock_count = stock_count;
        this.description = description;
    }
}

export class CreateProductDTO implements Omit<ProductDTO, "id">{
    name : string;
    price : number;
    stock_count : number;
    description : string;
    constructor({name,price,stock_count,description} : Omit<ProductDTO, "id">) {
        this.name = name;
        this.price = price;
        this.stock_count = stock_count;
        this.description = description;
    }
}

