import {DatabaseProvider} from "../database-provider";

export class Manager
{
    databaseProvider: DatabaseProvider;

    constructor(databaseProvider: DatabaseProvider)
    {
        this.databaseProvider = databaseProvider;
    }

    public getDatabaseProvider(): DatabaseProvider
    {
        return this.databaseProvider;
    }
}
