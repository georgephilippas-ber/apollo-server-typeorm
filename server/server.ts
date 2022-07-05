import {ApolloServer, gql, ServerInfo} from "apollo-server";
import {buildSchema} from "graphql";

export async function apolloServer(port: number = 4_000): Promise<ApolloServer>
{
    let server_ = new ApolloServer({
        schema: buildSchema("type Query { hello: String }"),
        resolvers: {},

    })

    server_.listen({port}).then(value => console.log(value.url));

    return server_;
}
