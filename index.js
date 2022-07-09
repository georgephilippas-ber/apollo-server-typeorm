"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_provider_1 = require("./database/database-provider");
const product_manager_1 = require("./database/entities-model/features/TypeORM/product/manager/product-manager");
const product_schema_1 = require("./database/entities-model/features/TypeORM/product/schemas/product-schema");
const nutritional_value_schema_1 = require("./database/entities-model/features/TypeORM/product/schemas/nutritional-value-schema");
const product_photo_schema_1 = require("./database/entities-model/features/TypeORM/product/schemas/product-photo-schema");
const server_1 = require("./server/server");
const product_resolver_1 = require("./server/graphql/resolvers/product/product-resolver");
const authentication_1 = require("./server/authentication/routers/authentication/authentication");
const agent_manager_1 = require("./database/entities-model/features/TypeORM/agent/manager/agent-manager");
const agent_schema_1 = require("./database/entities-model/features/TypeORM/agent/schemas/agent-schema");
const seed_agent_1 = require("./database/seed/seed-agent");
const seed_product_1 = require("./database/seed/seed-product");
let main = async () => {
    const databaseProvider_ = new database_provider_1.DatabaseProvider("database", [agent_schema_1.Agent, product_schema_1.Product, product_schema_1.ProductCategory, product_photo_schema_1.ProductPhoto, nutritional_value_schema_1.NutritionalValue, nutritional_value_schema_1.Carbohydrates, nutritional_value_schema_1.Fat, nutritional_value_schema_1.Vitamins, nutritional_value_schema_1.Minerals]);
    await databaseProvider_.initialize();
    let agentManager = new agent_manager_1.AgentManager(databaseProvider_);
    let productManager = new product_manager_1.ProductManager(databaseProvider_, agentManager);
    await (0, seed_agent_1.seedAuthentication)(agentManager);
    await (0, seed_product_1.seedProducts)(productManager);
    let server_ = new server_1.ApolloExpressServer([new product_resolver_1.ProductResolver(productManager)]);
    let authenticationRouter = new authentication_1.AuthenticationRoute(server_.express_application_, agentManager);
    authenticationRouter.register_router();
    await server_.start();
    process.on("SIGINT", async (args) => {
        console.log();
        console.log("!apolloServer");
        await server_.stop();
        console.log("!databaseProvider_");
        await databaseProvider_.destroy();
    });
};
main().then(value => null);
