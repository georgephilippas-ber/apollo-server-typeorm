import {Resolver} from "../resolver";

class ProductResolver extends Resolver
{
    getQueryResolver(): any
    {
        return {
            default: () => "this"
        };
    }
}

export const productResolver = new ProductResolver();
