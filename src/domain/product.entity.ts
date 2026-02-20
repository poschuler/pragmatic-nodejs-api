type CreateProductProps = {
    name: string;
    description: string;
    price: number;
};

export class Product {
    private constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly description: string,
        public readonly price: number,
    ) { }

    public static create(props: CreateProductProps): Product {

        if (!props.name) {
            throw new Error("Product name is required");
        }

        if (!props.description) {
            throw new Error("Product description is required");
        }

        if (props.price <= 0) {
            throw new Error("Product price must be greater than zero");
        }

        // ID generation simulation
        const id = Math.floor(Math.random() * 1000);

        return new Product(id, props.name, props.description, props.price);
    }
}