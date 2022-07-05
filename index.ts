import {DatabaseProvider} from "./database/database-provider";
import {
    Carbohydrates,
    Fat,
    Minerals,
    NutritionalValue,
    Product, ProductCategory,
    Vitamins
} from "./database-model/entities/product/product-schema";
import {seedProducts} from "./database-model/seed/product";
import {ProductManager} from "./database-model/entities/product/product-manager";

import {log} from "./utilities/utilities";

let databaseProvider_ = new DatabaseProvider([Product, NutritionalValue, Carbohydrates, Fat, Vitamins, Minerals, ProductCategory]);


(async () =>
{
    await databaseProvider_.initialize();

    let productManager: ProductManager = new ProductManager(databaseProvider_);

    await seedProducts(productManager);

    log(await productManager.all());

    await databaseProvider_.destroy();
})();
