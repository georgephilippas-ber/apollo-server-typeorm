import {inspect} from "node:util";

export function log(object_: unknown)
{
    console.log(inspect(object_, {depth: null, showHidden: false, colors: true}));
}

export function combine(object_array_: object[])
{
    return object_array_.reduce((previousValue, currentValue) => Object.assign(currentValue, previousValue), {});
}
