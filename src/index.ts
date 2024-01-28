import {ProductService} from "./Service/product-service";
import {ProductRepository} from "./Repository/product-repository";
import {ProductVariantRepository} from "./Repository/product-variant-repository.ts";
import {ProductControllers} from "./Controller/product-controllers";

import App from "./server";


// build app
const app = new App([
    new ProductControllers(
        new ProductService(
            new ProductRepository(),
            new ProductVariantRepository()
        )
    ),
]);

// start express server
app.appListen()