import {DatabaseProvider} from "./database/database-provider";

import {seedProducts} from "./database/database-model/seed/seed-product";
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

import {ApolloExpressServer} from "./server/server";
import {ProductResolver} from "./server/graphql/resolvers/product/product-resolver";
import {AuthenticationRouter} from "./server/authentication/routers/authentication/authentication";
import {AgentManager} from "./database/database-model/features/agent/manager/agent-manager";
import {Agent} from "./database/database-model/features/agent/schemas/agent-schema";
import {seedAuthentication} from "./database/database-model/seed/data/seed-agent";

let main = async () =>
{
    const databaseProvider_products = new DatabaseProvider("products", [Product, ProductCategory, ProductPhoto, NutritionalValue, Carbohydrates, Fat, Vitamins, Minerals,]);
    await databaseProvider_products.initialize();

    let productManager: ProductManager = new ProductManager(databaseProvider_products);

    await seedProducts(productManager);

    const databaseProvider_authentication = new DatabaseProvider("authentication", [Agent]);
    await databaseProvider_authentication.initialize();

    let agentManager: AgentManager = new AgentManager(databaseProvider_authentication);

    await seedAuthentication(agentManager);

    let server_ = new ApolloExpressServer([new ProductResolver(productManager)]);

    let authenticationRouter = new AuthenticationRouter(server_.express_application_, agentManager);

    authenticationRouter.register_router();

    await server_.start();

    process.on("SIGINT", async args =>
    {
        console.log();

        console.log("!apolloServer");
        await server_.stop();

        console.log("!databaseProvider_products");
        await databaseProvider_products.destroy();
        console.log("!databaseProvider_authentication");
        await databaseProvider_authentication.destroy();

    })
};

main().then(value => null);
