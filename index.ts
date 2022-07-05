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

import {GraphQLServer} from "./server/server";
import {ProductResolver} from "./server/graphql/resolvers/product/product-resolver";

let main = async () =>
{
    let databaseProvider_ = new DatabaseProvider([Product, ProductCategory, ProductPhoto, NutritionalValue, Carbohydrates, Fat, Vitamins, Minerals,]);
    await databaseProvider_.initialize();

    let productManager: ProductManager = new ProductManager(databaseProvider_);

    await seedProducts(productManager);

    let server_ = new GraphQLServer([new ProductResolver(productManager)]);

    server_.start().then(value => console.log(value.url));

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
