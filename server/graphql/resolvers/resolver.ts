import {combine} from "../../../utilities/utilities";

export abstract class Resolver
{
    public abstract getResolver(): any;
}

export function compileResolvers(resolvers_array_: Resolver[]): any
{
    return combine(resolvers_array_.map(value => value.getResolver()));
}
