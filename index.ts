import {DatabaseProvider} from "./database/database-provider";

import {ProductManager} from "./database/entities-model/features/TypeORM/product/manager/product-manager";
import {Product, ProductCategory} from "./database/entities-model/features/TypeORM/product/schemas/product-schema";
import {
    Fat,
    Minerals,
    NutritionalValue,
    Carbohydrates,
    Vitamins
} from "./database/entities-model/features/TypeORM/product/schemas/nutritional-value-schema";
import {ProductPhoto} from "./database/entities-model/features/TypeORM/product/schemas/product-photo-schema";

import {ApolloExpressServer} from "./server/server";
import {ProductResolver} from "./server/graphql/resolvers/product/product-resolver";
import {AuthenticationRoute} from "./server/authentication/routers/authentication/authentication";
import {AgentManager} from "./database/entities-model/features/TypeORM/agent/manager/agent-manager";
import {Agent} from "./database/entities-model/features/TypeORM/agent/schemas/agent-schema";
import {seedAuthentication} from "./database/seed/seed-agent";
import {seedProducts} from "./database/seed/seed-product";

let main = async () =>
{
    const databaseProvider_ = new DatabaseProvider("database", [Agent, Product, ProductCategory, ProductPhoto, NutritionalValue, Carbohydrates, Fat, Vitamins, Minerals]);
    await databaseProvider_.initialize();

    let agentManager: AgentManager = new AgentManager(databaseProvider_);
    let productManager: ProductManager = new ProductManager(databaseProvider_, agentManager);

    await seedAuthentication(agentManager);
    await seedProducts(productManager);

    let server_ = new ApolloExpressServer([new ProductResolver(productManager)]);

    let authenticationRouter = new AuthenticationRoute(server_.express_application_, agentManager);

    authenticationRouter.register_router();

    await server_.start();

    process.on("SIGINT", async args =>
    {
        console.log();

        console.log("!apolloServer");
        await server_.stop();

        console.log("!databaseProvider_");
        await databaseProvider_.destroy();
    });
};

main().then(value => null);
