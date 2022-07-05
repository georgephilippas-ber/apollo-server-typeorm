import {combine} from "../../../core/utilities/utilities";

export abstract class Resolver
{
    public abstract getQueryResolver(): any;
}

export function compileResolvers(resolvers_array_: Resolver[]): any
{
    let query_resolvers_ = combine(resolvers_array_.map(value => value.getQueryResolver()));

    return {
        Query: query_resolvers_,
    };
}
