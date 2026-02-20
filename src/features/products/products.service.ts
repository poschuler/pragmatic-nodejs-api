import { Product } from "../../domain/product.entity";
import type { CreateProductRequest } from "./create-product/create-product.request";

export class ProductsService {
    private products: Product[] = [
        Product.create(
            {
                name: "Laptop",
                description: "A high-performance laptop",
                price: 1200.0,
            }),
        Product.create({
            name: "Smartphone",
            description: "A feature-rich smartphone",
            price: 800.0,
        }),
    ];

    public getAllProducts(): Product[] {
        return this.products;
    }

    public createProduct(product: CreateProductRequest): Product {

        const newProduct = Product.create({
            name: product.name,
            description: product.description,
            price: product.price,
        });

        this.products.push(newProduct);
        return newProduct;
    }
}