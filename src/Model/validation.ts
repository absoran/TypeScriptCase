import Joi, { ObjectSchema } from "joi";
import {CreateProductDTO, ProductDTO, UpdateProductDTO} from "./product-DTO";
import {ProductVariantDTO} from "./product-variant-DTO.ts";
import {ProductVariant} from "./product-variant.ts";

/*
Used Joi package for request validations, if the request body is invalid the request will be-
rejected in controller layer, this validation will prevent database interaction with invalid data.
 */

// CreateProductSchema is used in CreateProduct operations, restrictions defined in body section
export const CreateProductSchema: ObjectSchema<CreateProductDTO> = Joi.object({
    body: {
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        price: Joi.number().required(),
        stock_count: Joi.number().required(),
    },
});

// UpdateProductSchema is used in UpdateProduct operations, restrictions defined in body section
export const UpdateProductSchema: ObjectSchema<UpdateProductDTO> = Joi.object({
    body: {
        id: Joi.number().required(),
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        price: Joi.number().required(),
        stock_count: Joi.number().required(),
    },
});

// ProductIdSchema is used by id validation in endpoint e.g: getProductById
// id field is required and expected as string in endpoints that uses ProductIdSchema
export const ProductIdSchema: ObjectSchema<Pick<ProductDTO, "id">> = Joi.object({
    params: {
        id: Joi.string().required()
    },
});

// CreateProductVariantSchema is used in CreateProductVariant operations, restrictions defined in body section
export const CreateProductVariantSchema: ObjectSchema<ProductVariantDTO> = Joi.object({
    body: {
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
    },
});

// UpdateProductSchema is used in UpdateProduct operations, restrictions defined in body section
export const UpdateProductVariantSchema: ObjectSchema<ProductVariantDTO> = Joi.object({
    body: {
        id: Joi.number().required(),
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
    },
});

// ProductIdSchema is used by id validation in endpoint e.g: getProductById
// id field is required and expected as string in endpoints that uses ProductIdSchema
export const ProductVariantIdSchema: ObjectSchema<Pick<ProductVariant, "id">> = Joi.object({
    params: {
        id: Joi.string().required()
    },
});