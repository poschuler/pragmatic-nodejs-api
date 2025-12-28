import { Router, type Request, type Response } from "express";
import { productsRoutes } from "./features/products/products-routes";
import { ExceptionHandlerMiddleware } from "./middlewares/exception-handler.middleware";

export const appRoutes = (): Router => {
  const router = Router();

  const exceptionHandlerMiddleware = new ExceptionHandlerMiddleware();

  router.use("/api/products", productsRoutes());

  router.get("/health", (_: Request, res: Response) => {
    res.json({
      status: "up",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  router.use(exceptionHandlerMiddleware.handle);

  return router;
};
