import {ProductManager} from "../entities/product/product-manager";
import {categories_data_, product_data_} from "./data/product";
import {Product, ProductCategory} from "../entities/product/product-schema";

async function createCategories(productManager_: ProductManager): Promise<ProductCategory[]>
{
    return Promise.all(categories_data_.map(value => productManager_.createCategory(value)))
}

async function createProducts(productManager_: ProductManager): Promise<Product[]>
{
    return Promise.all(product_data_.map(value => productManager_.createProduct(value.product_, value.categories_)));
}

export async function seedProducts(productManager_: ProductManager): Promise<void>
{
    await createCategories(productManager_);

    await createProducts(productManager_);
}
