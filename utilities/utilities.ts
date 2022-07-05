import {inspect} from "node:util";

export function log(object_: unknown)
{
    console.log(inspect(object_, {depth: null, showHidden: false, colors: true}));
}
