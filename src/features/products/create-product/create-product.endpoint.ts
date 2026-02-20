import type { Request, Response } from "express";
import { validateRequestWithSchema } from "../../../shared/validations/validate-request-with-schema";
import { createProductSchema } from "./create-products.schema";
import { CreateProductRequest } from "./create-product.request";
import type { ProductsService } from "../products.service";
import { CreateProductMapper } from "./create-product.mapper";

export const createProduct = (service: ProductsService) => (req: Request, res: Response) => {

    const validateResult = validateRequestWithSchema(
        createProductSchema,
        req,
    );

    const createProductRequest = new CreateProductRequest(
        validateResult.body.name,
        validateResult.body.description,
        validateResult.body.price,
    );

    const newProduct = service.createProduct(createProductRequest);

    const response = CreateProductMapper.toResponse(newProduct);

    res.status(201).json(response);
}