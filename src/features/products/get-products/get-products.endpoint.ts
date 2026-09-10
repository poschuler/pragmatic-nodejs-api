import type { Request, Response } from "express";
import type { ProductsService } from "../products.service.js";
import { GetProductsMapper } from "./get-products.mapper.js";

export const getProducts = (service: ProductsService) => (_: Request, res: Response) => {

    const products = service.getAllProducts();

    const response = products.map(p => GetProductsMapper.toResponse(p));

    res.status(200).json(response);

};