import {DatabaseProvider} from "../../../../database-provider";
import {Product, ProductCategory} from "../schemas/product-schema";
import {ProductPhoto} from "../schemas/product-photo-schema";
import {ILike} from "typeorm";

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

    async createPhoto(identifier: string, uri: string)
    {
        return this.databaseProvider.getDataSource().getRepository(ProductPhoto).save({identifier, uri});
    }

    async categoryByName(category_name: string): Promise<ProductCategory>
    {
        let product_category_ = await this.databaseProvider.getDataSource().getRepository(ProductCategory).findOne({where: {category_name: category_name}});

        if (!product_category_)
            throw new Error();
        else
            return product_category_;
    }

    async photoByIdentifier(identifier: string): Promise<ProductPhoto>
    {
        let product_photo_ = await this.databaseProvider.getDataSource().getRepository(ProductPhoto).findOne({where: {identifier: identifier}});

        if (!product_photo_)
            throw new Error();
        else
            return product_photo_;
    }

    async createProduct(product: Product, categories_: string[], photo_identifiers_: string[]): Promise<Product>
    {
        product.categories = await Promise.all(categories_.map(value => this.categoryByName(value)));
        product.photos = await Promise.all(photo_identifiers_.map(value => this.photoByIdentifier(value)));

        return this.databaseProvider.getDataSource().getRepository(Product).save(product);
    }

    async queryProductByProductName(partial_product_name_: string): Promise<Product[]>
    {
        return this.databaseProvider.getDataSource().getRepository(Product).find({
            where: {
                name: ILike("%" + partial_product_name_ + "%")
            }
        });
    }

    async all(): Promise<Product[]>
    {
        return this.databaseProvider.getDataSource().getRepository(Product).find({});
    }
}
