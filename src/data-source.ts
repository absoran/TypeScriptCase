import {DataSource} from "typeorm";
import {Product} from "./Model/product";
import {ProductVariant} from "./Model/product-variant.ts";

// AppDataSource is typeorm object that holds connection config will be used in repository
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "kandula.db.elephantsql.com",
    port: 5432,
    username: "",
    password: "", // TODO delete before commit
    database: "",
    synchronize: true,
    logging: true,
    entities: [Product,ProductVariant],
    subscribers: [],
    migrations: [],
})