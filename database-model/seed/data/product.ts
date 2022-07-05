import {Product} from "../../entities/product/product-schema";

export const categories_data_array_: string[] =
    [
        "cereal",
    ];

export const product_data_array_: { product: Product, categories: string[] }[] = [
    {
        product:
            {
                name: "FITNESS Flakes",
                warning: "Kann Milch, Erdnüsse und Nüsse enthalten.",
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
        categories: ["cereal"]
    }
];
