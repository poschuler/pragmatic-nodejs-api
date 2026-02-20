import { Router } from "express";
import { ProductsService } from './products.service';
import { getProducts } from "./get-products/get-products.endpoint";
import { createProduct } from "./create-product/create-product.endpoint";


export const productsRoutes = (): Router => {
  const router = Router();
  
  const productService = new ProductsService();

  router.get("/", getProducts(productService));

  router.post("/", createProduct(productService));

  return router;
};
