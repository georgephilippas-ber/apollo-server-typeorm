import {DatabaseProvider} from "./database/database-provider";
import {
    Carbohydrates,
    Fat,
    Minerals,
    NutritionalValue,
    Product,
    Vitamins
} from "./database-model/entities/product/product";

let databaseProvider_ = new DatabaseProvider([Product, NutritionalValue, Carbohydrates, Fat, Vitamins, Minerals]);

(async () =>
{
    await databaseProvider_.initialize();

    let product_ = new Product();
    product_.nutritional_value = new NutritionalValue();
    product_.nutritional_value.carbohydrates = new Carbohydrates()
    product_.nutritional_value.fat = new Fat();
    product_.nutritional_value.minerals = new Minerals();

    product_.nutritional_value["energy"] = 10;


    databaseProvider_.getDataSource().manager.create(Product)
})();

