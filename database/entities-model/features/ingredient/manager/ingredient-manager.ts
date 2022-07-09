import {Manager} from "../../../../interface/manager";
import {DatabaseProvider} from "../../../../database-provider";
import {Ingredient} from "../schemas/ingredient-schema";
import {ProductManager} from "../../product/manager/product-manager";

type ingredient_quantity_type_ =
    {
        serving_index?: number;
        serving_quantity?: number;
        quantity?: string;
    }

export class IngredientManager extends Manager
{
    productManager: ProductManager;

    constructor(databaseProvider: DatabaseProvider, productManager: ProductManager)
    {
        super(databaseProvider);

        this.productManager = productManager;
    }

    createIngredientByProductName(product_name: string,): Ingredient
    {
        return {
            product: this.productManager.
        }
    }
}
