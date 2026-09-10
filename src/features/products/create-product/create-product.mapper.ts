import type { Product } from "../../../domain/product.entity.js";
import { CreateProductResponse } from "./create-product.response.js";

//biome-ignore lint: allow only static methods
export class CreateProductMapper {
    public static toResponse(product: Product): CreateProductResponse {
        const { id, name, description, price } = product;
        return new CreateProductResponse(id, name, description, price);
    }
}