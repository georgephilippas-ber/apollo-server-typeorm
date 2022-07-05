"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_provider_1 = require("./database/database-provider");
const seed_product_1 = require("./database/database-model/features/product/seed/seed-product");
const product_manager_1 = require("./database/database-model/features/product/manager/product-manager");
const product_schema_1 = require("./database/database-model/features/product/schemas/product-schema");
const nutritional_value_schema_1 = require("./database/database-model/features/product/schemas/nutritional-value-schema");
const product_photo_schema_1 = require("./database/database-model/features/product/schemas/product-photo-schema");
const server_1 = require("./server/server");
let main = async () => {
    let databaseProvider_ = new database_provider_1.DatabaseProvider([product_schema_1.Product, product_schema_1.ProductCategory, product_photo_schema_1.ProductPhoto, nutritional_value_schema_1.NutritionalValue, nutritional_value_schema_1.Carbohydrates, nutritional_value_schema_1.Fat, nutritional_value_schema_1.Vitamins, nutritional_value_schema_1.Minerals,]);
    await databaseProvider_.initialize();
    let productManager = new product_manager_1.ProductManager(databaseProvider_);
    await (0, seed_product_1.seedProducts)(productManager);
    //log(await productManager.all());
    let server_ = await (0, server_1.apolloServer)();
    process.on("SIGINT", async (args) => {
        console.log();
        console.log("!apolloServer");
        await server_.stop();
        console.log("!databaseProvider_");
        await databaseProvider_.destroy();
    });
};
main().then(value => null);
