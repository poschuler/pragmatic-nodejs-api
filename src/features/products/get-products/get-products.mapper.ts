import type { Product } from "../../../domain/product.entity";
import { GetProductsResponse } from "./get-products.response";

//biome-ignore lint: allow only static methods
export class GetProductsMapper {
    public static toResponse(product: Product): GetProductsResponse {
        const { id, name, description, price } = product;
        return new GetProductsResponse(id, name, description, price);
    }
}