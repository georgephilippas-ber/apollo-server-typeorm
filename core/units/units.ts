import {unit, Unit} from "mathjs";

function convert(product_quantity_type: "mass" | "volume", target_units_: string, target_quantity_: number, object_: any, recursive_: boolean = true): typeof object_
{
    let record_units_: Unit = product_quantity_type === "mass" ? unit(100., "g") : unit(100., "ml");

    let scale_: number = record_units_.to(target_units_).toNumber();

    let converted_object_: any = {};

    for (let property_ in object_)
    {
        let value_ = object_[property_ as keyof typeof object_];

        if (typeof value_ === "number")
            converted_object_[property_ as keyof typeof converted_object_] = value_ / scale_ * target_quantity_;
        else if ((typeof value_ === "object") && recursive_)
            converted_object_[property_ as keyof typeof converted_object_] = convert(product_quantity_type, target_units_, target_quantity_, value_);
        else
            converted_object_[property_] = value_;
    }

    return converted_object_ as typeof object_;
}

function presentable(object_: any, units_: string, recursive_: boolean = false): typeof object_
{
    let presentable_object_: any = {};

    for (let property_ in object_)
    {
        let value_ = object_[property_ as keyof typeof object_];

        if (typeof value_ === "number")
            presentable_object_[property_ as keyof typeof presentable_object_] = unit(value_, units_).format({
                notation: "auto",
                precision: 2
            });
        else if ((typeof value_ === "object") && recursive_)
            presentable_object_[property_ as keyof typeof presentable_object_] = presentable(value_, units_);
        else
            presentable_object_[property_] = value_;
    }

    return presentable_object_;
}

let sample: any = {
    riboflavin: 20,
    f: "sfsdl",
    g: {
        l: "nothing",
        p: 10
    }
}


console.log(convert("mass", "mg", 200, sample, true));

console.log(presentable(sample, "mg", false));