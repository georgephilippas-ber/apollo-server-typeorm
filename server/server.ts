import {ApolloServer} from "apollo-server";
import {buildSchema, GraphQLSchema} from "graphql";
import * as path from "path";
import * as fs from "fs";
import {compileResolvers, Resolver} from "./graphql/resolvers/resolver";

export class GraphQLServer
{
    server_: ApolloServer;

    constructor(resolvers_array_: Resolver[])
    {
        this.server_ = new ApolloServer({
            typeDefs: compileSchema(),
            resolvers: compileResolvers(resolvers_array_),
        });
    }

    start(port: number = 4_000)
    {
        return this.server_.listen({port});
    }

    stop()
    {
        return this.server_.stop();
    }
}

function compileSchema(): GraphQLSchema
{
    let schemas_path_ = path.join(__dirname, "graphql", "schemas");

    let aggregate_schema_: string = fs.readdirSync(schemas_path_).map(value => fs.readFileSync(path.join(schemas_path_, value))).reduce((previousValue, currentValue) => previousValue + currentValue, "");

    return buildSchema(aggregate_schema_);
}
