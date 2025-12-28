import { Router, type Request, type Response } from "express";
import { productsRoutes } from "./features/products/products-routes";

export const appRoutes = (): Router => {
  const router = Router();

  router.use("/api/products", productsRoutes());

  router.get("/health", (_: Request, res: Response) => {
    res.json({
      status: "up",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  return router;
};
