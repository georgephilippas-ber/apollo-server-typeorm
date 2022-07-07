import {string, unit, Unit} from "mathjs";
import {Vitamins} from "../../database/database-model/features/product/schemas/nutritional-value-schema";

let a: Unit = unit(2, "mg").to("kg");

//console.log(a.to("mg").format({notation: "auto", precision: 2}));

function convert(product_quantity_type: "mass" | "volume", target_quantity_: number, target_unit_: string, object_: any): typeof object_
{
    let record_units_: Unit = product_quantity_type === "mass" ? unit(100., "g") : unit(100., "ml");

    let scale_: number = record_units_.to(target_unit_).toNumber();

    let converted_object_: any = {};

    for (let property_ in object_)
    {
        let value_ = object_[property_ as keyof typeof object_];

        if (typeof value_ === "number")
            converted_object_[property_ as keyof typeof converted_object_] = value_ / scale_ * target_quantity_;
    }

    return converted_object_ as typeof object_;
}

let sample: Vitamins = {
    riboflavin: 20
}

console.log(convert("volume", 1, "litre", sample));
