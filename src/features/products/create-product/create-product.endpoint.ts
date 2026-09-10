import type { Request, Response } from "express";
import { validateRequestWithSchema } from "../../../shared/validations/validate-request-with-schema.js";
import { createProductSchema } from "./create-products.schema.js";
import { CreateProductRequest } from "./create-product.request.js";
import type { ProductsService } from "../products.service.js";
import { CreateProductMapper } from "./create-product.mapper.js";

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