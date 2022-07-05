import {Resolver} from "../resolver";

class ProductResolver extends Resolver
{
    getResolver(): any
    {
        return {
            default: () => "this"
        };
    }
}

export const productResolver = new ProductResolver();
