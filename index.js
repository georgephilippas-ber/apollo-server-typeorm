"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_provider_1 = require("./database/database-provider");
const product_1 = require("./database-model/features/product/seed/product");
const product_manager_1 = require("./database-model/features/product/manager/product-manager");
const utilities_1 = require("./utilities/utilities");
const product_schema_1 = require("./database-model/features/product/schemas/product-schema");
const nutritional_value_schema_1 = require("./database-model/features/product/schemas/nutritional-value-schema");
let databaseProvider_ = new database_provider_1.DatabaseProvider([product_schema_1.Product, product_schema_1.ProductCategory, nutritional_value_schema_1.NutritionalValue, nutritional_value_schema_1.Carbohydrates, nutritional_value_schema_1.Fat, nutritional_value_schema_1.Vitamins, nutritional_value_schema_1.Minerals,]);
(async () => {
    await databaseProvider_.initialize();
    let productManager = new product_manager_1.ProductManager(databaseProvider_);
    await (0, product_1.seedProducts)(productManager);
    (0, utilities_1.log)(await productManager.all());
    await databaseProvider_.destroy();
})();
