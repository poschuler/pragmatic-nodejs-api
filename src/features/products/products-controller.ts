import type { Request, Response } from "express";

const products = [
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

  public addProduct = async (_: Request, __: Response) => {
    throw new Error("Not implemented");
  };
}
