import Joi, { ObjectSchema } from "joi";
import {CreateProductDTO, ProductDTO, UpdateProductDTO} from "./product-DTO";

export const CreateProductSchema: ObjectSchema<CreateProductDTO> = Joi.object({
    body: {
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        price: Joi.number().required(),
        stock_count: Joi.number().required(),
    },
});

export const UpdateProductSchema: ObjectSchema<UpdateProductDTO> = Joi.object({
    body: {
        id: Joi.number().required(),
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        price: Joi.number().required(),
        stock_count: Joi.number().required(),
    },
});

export const ProductIdSchema: ObjectSchema<Pick<ProductDTO, "id">> = Joi.object({
    params: {
        id: Joi.string().required()
    },
});
