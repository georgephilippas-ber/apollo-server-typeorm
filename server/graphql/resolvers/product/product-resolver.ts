import {Resolver} from "../resolver";

import {faker} from "@faker-js/faker";
import {ProductManager} from "../../../../database/database-model/features/product/manager/product-manager";

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
            all: () => this.productManager.all()
        };
    }
}
