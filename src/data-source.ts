import {DataSource} from "typeorm";
import {Product} from "./Model/product";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "kandula.db.elephantsql.com",
    port: 5432,
    username: "",
    password: "", // TODO delete before commit
    database: "",
    synchronize: true,
    logging: true,
    entities: [Product],
    subscribers: [],
    migrations: [],
})