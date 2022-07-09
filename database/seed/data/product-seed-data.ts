import {Product} from "../../entities-model/features/TypeORM/product/schemas/product-schema";
import {ProductPhoto} from "../../entities-model/features/TypeORM/product/schemas/product-photo-schema";

export const categories_data_array_: string[] =
    [
        "cereal", "fruit"
    ];

export const photos_data_array_: ProductPhoto[] = [
    {
        identifier: "FITNESS Flakes",
        uri: "https://www.nestle-cereals.com/de/sites/g/files/fawtmp126/files/styles/scale_992_webp/public/d7/cpp_44083713_fitness_375g_de_at_ch_2021_3d_p99_1.png"
    },
    {
        identifier: "banana",
        uri: "https://images.unsplash.com/photo-1561058325-8c99b449e3b6"
    }
];

export const products_data_array_: { product: Product, categories: string[], photo_identifiers: string[], agent_username: string }[] = [
    {
        product:
            {
                name: "FITNESS Flakes",
                warning: "Kann Milch, Erdnüsse und Nüsse enthalten.",
                product_quantity_type: "mass",
                package_quantities: "375g",
                serving_quantities: "30g, 40g",
                nutritional_value:
                    {
                        carbohydrates:
                            {
                                carbohydrates_total: 74.8,
                                sugar: 10.8,
                            },
                        fat:
                            {
                                fat_total: 1.8
                            },
                        protein: 9.4,
                        energy: 368.,
                        vitamins:
                            {
                                riboflavin: 1.3,
                                niacin: 13.,
                                pyridoxine: 1.1,
                                pantothenicAcid: 5.2,
                                folicAcid: 0.153,
                            },
                        minerals:
                            {
                                calcium: 637.,
                                iron: 13.
                            }
                    }
            },
        categories: ["cereal"],
        photo_identifiers: ["FITNESS Flakes"],
        agent_username: "root"
    },
    {
        product:
            {
                name: "banana",
                product_type: "generic",
                product_quantity_type: "mass",
                serving_quantities: "81g, 101g, 118g, 136g",
                nutritional_value:
                    {
                        energy: 89.,
                        protein: 1.1,
                        carbohydrates:
                            {
                                carbohydrates_total: 22.8,
                                sugar: 12.2,
                                fibre: 2.6
                            },
                        fat:
                            {
                                fat_total: 0.3
                            },
                        vitamins:
                            {
                                retinol: 0.0192,
                                ascorbicAcid: 8.7,
                                niacin: 0.7,
                                folicAcid: 0.02,
                                pyridoxine: 0.4,
                            },
                        minerals:
                            {
                                calcium: 5,
                                potassium: 358,
                                iron: 0.3
                            }
                    }
            },
        categories: ["fruit"],
        photo_identifiers: ["banana"],
        agent_username: "root"
    },
    {
        product:
            {
                name: "tomato",
                product_type: "generic",
                product_quantity_type: "mass",
                serving_quantities: "81g, 101g, 118g, 136g",
                nutritional_value:
                    {
                        energy: 89.,
                        protein: 1.1,
                        carbohydrates:
                            {
                                carbohydrates_total: 22.8,
                                sugar: 12.2,
                                fibre: 2.6
                            },
                        fat:
                            {
                                fat_total: 0.3
                            },
                        vitamins:
                            {
                                retinol: 0.0192,
                                ascorbicAcid: 8.7,
                                niacin: 0.7,
                                folicAcid: 0.02,
                                pyridoxine: 0.4,
                            },
                        minerals:
                            {
                                calcium: 5,
                                potassium: 358,
                                iron: 0.3
                            }
                    }
            },
        categories: ["fruit"],
        photo_identifiers: ["banana"],
        agent_username: "root"
    },
    {

        product:
            {
                name: "potato",
                product_type: "generic",
                product_quantity_type: "mass",
                serving_quantities: "81g, 101g, 118g, 136g",
                nutritional_value:
                    {
                        energy: 89.,
                        protein: 1.1,
                        carbohydrates:
                            {
                                carbohydrates_total: 22.8,
                                sugar: 12.2,
                                fibre: 2.6
                            },
                        fat:
                            {
                                fat_total: 0.3
                            },
                        vitamins:
                            {
                                retinol: 0.0192,
                                ascorbicAcid: 8.7,
                                niacin: 0.7,
                                folicAcid: 0.02,
                                pyridoxine: 0.4,
                            },
                        minerals:
                            {
                                calcium: 5,
                                potassium: 358,
                                iron: 0.3
                            }
                    }
            },
        categories: ["fruit"],
        photo_identifiers: ["banana"],
        agent_username: "root"
    }
];
