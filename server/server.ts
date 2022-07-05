import {ApolloServer} from "apollo-server";
import {buildSchema, GraphQLSchema} from "graphql";
import * as path from "path";
import * as fs from "fs";
import {compileResolvers} from "./graphql/resolvers/resolver";
import {productResolver} from "./graphql/resolvers/product/product-resolver";

function compileSchema(): GraphQLSchema
{
    let schemas_path_ = path.join(__dirname, "graphql", "schemas");

    let aggregate_schema_: string = fs.readdirSync(schemas_path_).map(value => fs.readFileSync(path.join(schemas_path_, value))).reduce((previousValue, currentValue) => previousValue + currentValue, "");

    return buildSchema(aggregate_schema_);
}

export async function apolloServer(port: number = 4_000): Promise<ApolloServer>
{
    let server_ = new ApolloServer({
        typeDefs: compileSchema(),
        resolvers: compileResolvers([productResolver]),
    });

    server_.listen({port}).then(value => console.log(value.url));

    return server_;
}
