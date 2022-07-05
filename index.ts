import {DatabaseProvider} from "./database/database-provider";

import {seedProducts} from "./database-model/features/product/seed/seed-product";
import {ProductManager} from "./database-model/features/product/manager/product-manager";

import {log} from "./utilities/utilities";
import {Product, ProductCategory} from "./database-model/features/product/schemas/product-schema";
import {
    Carbohydrates,
    Fat, Minerals,
    NutritionalValue,
    Vitamins
} from "./database-model/features/product/schemas/nutritional-value-schema";
import {ProductPhoto} from "./database-model/features/product/schemas/product-photo-schema";

let databaseProvider_ = new DatabaseProvider([Product, ProductCategory, ProductPhoto, NutritionalValue, Carbohydrates, Fat, Vitamins, Minerals,]);

(async () =>
{
    await databaseProvider_.initialize();

    let productManager: ProductManager = new ProductManager(databaseProvider_);

    await seedProducts(productManager);

    log(await productManager.all());

    await databaseProvider_.destroy();
})();
