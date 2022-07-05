import {DatabaseProvider} from "../../../database/database-provider";
import {Product, ProductCategory} from "./product-schema";

export class ProductManager
{
    databaseProvider: DatabaseProvider;

    constructor(databaseProvider: DatabaseProvider)
    {
        this.databaseProvider = databaseProvider;
    }

    async allProductCategories(): Promise<ProductCategory[]>
    {
        return this.databaseProvider.getDataSource().getRepository(ProductCategory).find({});
    }

    async createCategory(category_name: string)
    {
        return this.databaseProvider.getDataSource().getRepository(ProductCategory).save({category_name: category_name});
    }

    async productCategoryByName(category_name: string): Promise<ProductCategory>
    {
        let product_category_ = await this.databaseProvider.getDataSource().getRepository(ProductCategory).findOne({where: {category_name: category_name}});

        if (!product_category_)
            throw new Error();
        else
            return product_category_;
    }

    async createProduct(product: Product, categories_: string[] = []): Promise<Product>
    {
        product.categories_ = await Promise.all(categories_.map(value => this.productCategoryByName(value)));

        return this.databaseProvider.getDataSource().getRepository(Product).save(product);
    }

    async all(): Promise<Product[]>
    {
        return this.databaseProvider.getDataSource().getRepository(Product).find({});
    }
}
