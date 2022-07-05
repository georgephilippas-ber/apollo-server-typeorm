import {inspect} from "node:util";

export function log(object_: unknown)
{
    console.log(inspect(object_, {depth: null, showHidden: false, colors: true}));
}

export function combine(object_array_: any)
{
    return object_array_.filter((value: any) => !([null, undefined].includes(value))).reduce((previousValue: any, currentValue: any) => Object.assign(currentValue, previousValue), {});
}
