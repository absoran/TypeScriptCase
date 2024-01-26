import express from "express"
import { Request, Response } from "express"
import {AppDataSource} from "../src/data-source"
import {ProductService} from "./Service/product-service";
import {IProductRepository} from "./Repository/product-repository-interface";
import {Product} from "./Model/product";
import {ProductRepository} from "./Repository/product-repository";

AppDataSource
    .initialize()
    .then(() =>  {
        console.log("Connected to the Db")
    })
    .catch((err) => {
        console.error("Error during connection to the Db", err)
    })

// create and setup express app
const app = express()
const pr = new ProductRepository()
const ps = new ProductService(pr)
app.use(express.json())



// register routes

app.get("/users", function (req: Request, res: Response) {

})

app.get("/users/:id", function (req: Request, res: Response) {
    // here we will have logic to return user by id
})

app.post("/product", function (req: Request, res: Response) {
    //let data = new Product(req.body.data)
    //ps.createProduct(data)
})

app.put("/users/:id", function (req: Request, res: Response) {
    // here we will have logic to update a user by a given user id
})

app.delete("/users/:id", function (req: Request, res: Response) {
    // here we will have logic to delete a user by a given user id
})

// start express server
app.listen(3000,():void => {console.log("server is running")})