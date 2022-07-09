import {ProductManager} from "../entities-model/features/TypeORM/product/manager/product-manager";
import {categories_data_array_, photos_data_array_, products_data_array_} from "./data/product-seed-data";
import {Product, ProductCategory} from "../entities-model/features/TypeORM/product/schemas/product-schema";
import {ProductPhoto} from "../entities-model/features/TypeORM/product/schemas/product-photo-schema";

async function createCategories(productManager_: ProductManager): Promise<ProductCategory[]>
{
    return Promise.all(categories_data_array_.map(value => productManager_.createCategory(value)))
}

async function createPhotos(product_Manager_: ProductManager): Promise<ProductPhoto[]>
{
    return Promise.all(photos_data_array_.map(value => product_Manager_.createPhoto(value.identifier, value.uri)));
}

async function createProducts(productManager_: ProductManager): Promise<Product[]>
{
    return Promise.all(products_data_array_.map(value => productManager_.createProduct(value.product, value.categories, value.photo_identifiers, value.agent_username)));
}

export async function seedProducts(productManager_: ProductManager): Promise<void>
{
    await createCategories(productManager_);

    await createPhotos(productManager_);

    await createProducts(productManager_);
}
