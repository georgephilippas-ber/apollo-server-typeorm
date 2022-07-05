import {ProductManager} from "../manager/product-manager";
import {categories_data_array_, product_data_array_} from "./data/product";
import {Product, ProductCategory} from "../schemas/product-schema";

async function createCategories(productManager_: ProductManager): Promise<ProductCategory[]>
{
    return Promise.all(categories_data_array_.map(value => productManager_.createCategory(value)))
}

async function createProducts(productManager_: ProductManager): Promise<Product[]>
{
    return Promise.all(product_data_array_.map(value => productManager_.createProduct(value.product, value.categories)));
}

export async function seedProducts(productManager_: ProductManager): Promise<void>
{
    await createCategories(productManager_);

    await createProducts(productManager_);
}
