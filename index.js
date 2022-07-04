"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_provider_1 = require("./database/database-provider");
const product_1 = require("./database-model/entities/product/product");
let databaseProvider_ = new database_provider_1.DatabaseProvider([product_1.Product, product_1.NutritionalValue, product_1.Carbohydrates, product_1.Fat, product_1.Vitamins, product_1.Minerals]);
(async () => {
    await databaseProvider_.initialize();
    let product_ = new product_1.Product();
    product_.nutritional_value = new product_1.NutritionalValue();
    product_.nutritional_value.carbohydrates = new product_1.Carbohydrates();
    product_.nutritional_value.fat = new product_1.Fat();
    product_.nutritional_value.minerals = new product_1.Minerals();
    product_.nutritional_value["energy"] = 10;
    databaseProvider_.getDataSource().manager.create(product_1.Product);
})();
