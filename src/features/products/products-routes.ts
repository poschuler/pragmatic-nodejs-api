import { Router } from "express";
import { ProductsController } from "./products-controller";

export const productsRoutes = (): Router => {
  const router = Router();

  const controller = new ProductsController();

  router.get("/", controller.getProducts);

  router.post("/", controller.createProduct);

  return router;
};
