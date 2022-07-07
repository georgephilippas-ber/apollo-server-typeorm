import {unit, Unit} from "mathjs";

function convert(product_quantity_type: "mass" | "volume", target_unit_: string, target_quantity_: number, object_: any): typeof object_
{
    let record_units_: Unit = product_quantity_type === "mass" ? unit(100., "g") : unit(100., "ml");

    let scale_: number = record_units_.to(target_unit_).toNumber();

    let converted_object_: any = {};

    for (let property_ in object_)
    {
        let value_ = object_[property_ as keyof typeof object_];

        if (typeof value_ === "number")
            converted_object_[property_ as keyof typeof converted_object_] = value_ / scale_ * target_quantity_;
        else if (typeof value_ === "object")
            converted_object_[property_ as keyof typeof converted_object_] = convert(product_quantity_type, target_unit_, target_quantity_, value_);
    }

    return converted_object_ as typeof object_;
}

let sample: any = {
    riboflavin: 20
}

console.log(convert("mass", "g", 200, sample));
