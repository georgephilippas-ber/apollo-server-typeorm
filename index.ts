import {DatabaseProvider} from "./database/database-provider";

import {seedProducts} from "./database/database-model/features/product/seed/seed-product";
import {ProductManager} from "./database/database-model/features/product/manager/product-manager";
import {Product, ProductCategory} from "./database/database-model/features/product/schemas/product-schema";
import {
    Carbohydrates,
    Fat,
    Minerals,
    NutritionalValue,
    Vitamins
} from "./database/database-model/features/product/schemas/nutritional-value-schema";
import {ProductPhoto} from "./database/database-model/features/product/schemas/product-photo-schema";
import {apolloServer} from "./server/server";

import {combine, log} from "./utilities/utilities";

let main = async () =>
{
    let databaseProvider_ = new DatabaseProvider([Product, ProductCategory, ProductPhoto, NutritionalValue, Carbohydrates, Fat, Vitamins, Minerals,]);

    await databaseProvider_.initialize();

    let productManager: ProductManager = new ProductManager(databaseProvider_);

    await seedProducts(productManager);

    //log(await productManager.all());

    let server_ = await apolloServer();

    process.on("SIGINT", async args =>
    {
        console.log();

        console.log("!apolloServer");
        await server_.stop();

        console.log("!databaseProvider_");
        await databaseProvider_.destroy();
    })
};

main().then(value => null);
