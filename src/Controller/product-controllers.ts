import {
    type Request,
    type Response,
    type NextFunction,
    Router,
} from "express";

import {ProductService} from "../Service/product-service";
import {CreateProductDTO, UpdateProductDTO} from "../Model/product-DTO";
import {validationMiddleware} from "../Middlewares/validation-middleware";
import {CreateProductSchema, ProductIdSchema, UpdateProductSchema} from "../Model/validation";

export class ProductControllers{
    readonly paths = "/products"
    readonly path = "/product"
    readonly router = Router();
    private productService: ProductService;

    constructor(productService : ProductService) {
        this.productService = productService;
        this.initializeRoutes()
    }

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
        this.router.put(
            `${this.path}`,
            validationMiddleware(UpdateProductSchema),
            this.UpdateProduct
        );
        this.router.delete(
            `${this.path}/:id`,
            validationMiddleware(ProductIdSchema),
            this.DeleteProduct
        );
    }

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

    private UpdateProduct = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {
            const dto = new UpdateProductDTO(request.body)

            const products = await this.productService.updateProduct(dto.id as number,dto);

            return response.status(200).json({
                data: {
                    products
                }
            });
        } catch (err) {
            next(err);
        }
    };

    private DeleteProduct = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {

            const products = await this.productService.deleteProduct(parseInt(request.params["id"],10));

            return response.status(200).json({
                data: {
                    products
                }
            });
        } catch (err) {
            next(err);
        }
    };

    private GetProductByID = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {

            const products = await this.productService.getProductById(parseInt(request.params["id"],10));

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