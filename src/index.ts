import {ProductService} from "./Service/product-service";
import {ProductRepository} from "./Repository/product-repository";
import App from "./server";

import {ProductControllers} from "./Controller/product-controllers";


const app = new App([
    new ProductControllers(
        new ProductService(
            new ProductRepository(),
        )
    ),
]);

// start express server
app.appListen()