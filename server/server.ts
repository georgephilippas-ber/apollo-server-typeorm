import {ApolloServer} from "apollo-server-express";
import {ApolloServerPluginDrainHttpServer} from "apollo-server-core";

import {buildSchema, GraphQLSchema} from "graphql";
import * as path from "path";
import * as fs from "fs";
import {compileResolvers, Resolver} from "./graphql/resolvers/resolver";
import express, {Express} from "express";
import http from "http";

export class ApolloExpressServer
{
    express_application_: Express;

    httpServer_: http.Server;

    apolloServer_: ApolloServer;

    constructor(resolvers_array_: Resolver[])
    {
        this.express_application_ = express();

        this.httpServer_ = http.createServer(this.express_application_);

        this.apolloServer_ = new ApolloServer({
            typeDefs: compileSchema(),
            resolvers: compileResolvers(resolvers_array_),
            csrfPrevention: true,
            cache: 'bounded',
            plugins: [ApolloServerPluginDrainHttpServer({httpServer: this.httpServer_})],
        });
    }

    async start(port: number = 4_000)
    {
        await this.apolloServer_.start();
        this.apolloServer_.applyMiddleware({app: this.express_application_});

        return this.httpServer_.listen(port, () =>
        {
            console.log(["http://localhost:", port, "/authentication"]);
            console.log(["http://localhost:", port, this.apolloServer_.graphqlPath].join(""));
        });
    }

    async stop()
    {
        await this.apolloServer_.stop();
        this.httpServer_.close();
    }
}

function compileSchema(): GraphQLSchema
{
    let schemas_path_ = path.join(__dirname, "graphql", "schemas");

    let aggregate_schema_: string = fs.readdirSync(schemas_path_).map(value => fs.readFileSync(path.join(schemas_path_, value))).reduce((previousValue, currentValue) => previousValue + currentValue, "");

    return buildSchema(aggregate_schema_);
}
