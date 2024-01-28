import {
    type Request,
    type Response,
    type NextFunction,
    Router,
} from "express";

import {
    CreateProductSchema,
    CreateProductVariantSchema,
    ProductIdSchema,
    ProductVariantIdSchema,
    UpdateProductSchema,
    UpdateProductVariantSchema
} from "../Model/validation";

import {ProductService} from "../Service/product-service";
import {CreateProductDTO, UpdateProductDTO} from "../Model/product-DTO";
import {validationMiddleware} from "../Middlewares/validation-middleware";
import {CreateProductVariantDTO, UpdateProductVariantDTO} from "../Model/product-variant-DTO.ts";

export class ProductControllers {
    readonly paths = "/products"
    readonly path = "/product"
    readonly router = Router();
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
        this.initializeRoutes()
    }

    // Route definitions
    public initializeRoutes() {

        this.router.get(
            `${this.paths}`,
            this.GetProducts
        );
        this.router.get(
            `${this.path}/:id`,
            validationMiddleware(ProductIdSchema),
            this.GetProductByID
        );
        this.router.post(
            `${this.path}`,
            validationMiddleware(CreateProductSchema),
            this.CreateProduct
        );
        this.router.post(
            `${this.path}/:id/variant`,
            validationMiddleware(CreateProductVariantSchema),
            this.CreateVariant
        );
        this.router.put(
            `${this.path}`,
            validationMiddleware(UpdateProductSchema),
            this.UpdateProduct
        );
        this.router.put(
            `${this.path}/variant`,
            validationMiddleware(UpdateProductVariantSchema),
            this.UpdateVariant
        );
        this.router.delete(
            `${this.path}/:id`,
            validationMiddleware(ProductIdSchema),
            this.DeleteProduct
        );
        this.router.delete(
            `${this.path}/variant/:id`,
            validationMiddleware(ProductVariantIdSchema),
            this.DeleteVariant
        );
    }

    // getProducts handler with error handling.
    private GetProducts = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {
            const products = await this.productService.getAllProducts();

            return response.status(200).json({
                data: {
                    products
                }
            });
        } catch (err) {
            next(err);
        }
    };

    private CreateProduct = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {
            const dto = new CreateProductDTO(request.body)

            const products = await this.productService.createProduct(dto);

            return response.status(200).json({
                data: {
                    products
                }
            });
        } catch (err) {
            next(err);
        }
    };

    private CreateVariant = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {
            const dto = new CreateProductVariantDTO(request.body)
            dto.product_id = parseInt(request.params["id"], 10)
            const variant = await this.productService.createProductVariant(dto);

            return response.status(200).json({
                data: {
                    variant
                }
            });
        } catch (err) {
            next(err);
        }
    };

    // updateProduct handler with error handling.
    private UpdateProduct = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {
            const dto = new UpdateProductDTO(request.body)

            const products = await this.productService.updateProduct(dto.id as number, dto);

            return response.status(200).json({
                data: {
                    products
                }
            });
        } catch (err) {
            next(err);
        }
    };

    private UpdateVariant = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {
            const dto = new UpdateProductVariantDTO(request.body)

            const variant = await this.productService.updateProductVariant(dto.id as number, dto);

            return response.status(200).json({
                data: {
                    variant
                }
            });
        } catch (err) {
            next(err);
        }
    };

    // deleteProduct handler with error handling.
    private DeleteProduct = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {

            const products = await this.productService.deleteProduct(parseInt(request.params["id"], 10));

            return response.status(200).json({
                data: {
                    products
                }
            });
        } catch (err) {
            next(err);
        }
    };

    private DeleteVariant = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {

            const variant = await this.productService.deleteProductVariant(parseInt(request.params["id"], 10));

            return response.status(200).json({
                data: {
                    variant
                }
            });
        } catch (err) {
            next(err);
        }
    };

    // getProductById handler with error handling.
    private GetProductByID = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {

            const products = await this.productService.getProductById(parseInt(request.params["id"], 10));

            return response.status(200).json({
                data: {
                    products
                }
            });
        } catch (err) {
            next(err);
        }
    };

}