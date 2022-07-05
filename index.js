"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_provider_1 = require("./database/database-provider");
const product_schema_1 = require("./database-model/entities/product/product-schema");
const product_1 = require("./database-model/seed/product");
const product_manager_1 = require("./database-model/entities/product/product-manager");
let databaseProvider_ = new database_provider_1.DatabaseProvider([product_schema_1.Product, product_schema_1.NutritionalValue, product_schema_1.Carbohydrates, product_schema_1.Fat, product_schema_1.Vitamins, product_schema_1.Minerals, product_schema_1.ProductCategory]);
(async () => {
    await databaseProvider_.initialize();
    let productManager = new product_manager_1.ProductManager(databaseProvider_);
    await (0, product_1.seedProducts)(productManager);
    console.log(await productManager.all());
})();
