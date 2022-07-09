import {Resolver} from "../resolver";
import {ProductManager} from "../../../../database/entities-model/features/TypeORM/product/manager/product-manager";

export class ProductResolver extends Resolver
{
    productManager: ProductManager

    constructor(productManager: ProductManager)
    {
        super();

        this.productManager = productManager;
    }

    getQueryResolver(): any
    {
        return {
            all: (parent: any, args: any, context: any, info: any) => this.productManager.all(),
            random: (parent: any, args: any, context: any, info: any) => this.productManager.random(),
            productByName: (parent: any, args: any, context: any, info: any) => this.productManager.productByName(args.name),
            queryProductByName: (parent: any, args: any, context: any, info: any) => this.productManager.queryProductByProductName(args.partial_product_name_),
            productByCategoryName: (parent: any, args: any, context: any, info: any) => this.productManager.productByCategoryName(args.category_name),
            allCategories: (parent: any, args: any, context: any, info: any) => this.productManager.allProductCategories(),
            queryCategoryByName: (parent: any, args: any, context: any, info: any) => this.productManager.queryCategoryByName(args.partial_category_name_),
        };
    }
}
