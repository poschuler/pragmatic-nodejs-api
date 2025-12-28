import type { Request, Response } from "express";
import { validateRequestWithSchema } from "../../shared/validations/validate-request-with-schema";
import { createProductSchema } from "./schemas/create-products.schema";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    description: "A high-performance laptop",
    price: 1200.0,
  },
  {
    id: 2,
    name: "Smartphone",
    description: "A feature-rich smartphone",
    price: 800.0,
  },
];

export class ProductsController {
  public getProducts = async (_: Request, res: Response) => {
    res.status(200).json(products);
  };

  public createProduct = async (req: Request, res: Response) => {

    const validateResult = validateRequestWithSchema(
      createProductSchema,
      req,
    );

    const newProduct: Product = {
      id: products.length + 1,
      name: validateResult.body.name,
      description: validateResult.body.description,
      price: validateResult.body.price,
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
  };
}
