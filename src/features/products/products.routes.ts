import { Router } from "express";
import { ProductsService } from './products.service.js';
import { getProducts } from "./get-products/get-products.endpoint.js";
import { createProduct } from "./create-product/create-product.endpoint.js";


export const productsRoutes = (): Router => {
  const router = Router();
  
  const productService = new ProductsService();

  router.get("/", getProducts(productService));

  router.post("/", createProduct(productService));

  return router;
};
