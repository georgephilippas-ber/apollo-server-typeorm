import {Product} from "../../schemas/product-schema";

export const categories_data_array_: string[] =
    [
        "cereal", "fruit"
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
    },
    {
        product:
            {
                name: "banana",
                product_type: "generic",
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
        categories: ["fruit"]
    }
];
