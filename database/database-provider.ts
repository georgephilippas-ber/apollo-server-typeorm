import {DataSource} from "typeorm";

export class DatabaseProvider
{
    dataSource: DataSource

    initialized_: boolean;

    constructor(database_name_: string, entities_array_: Function[])
    {
        this.dataSource = new DataSource({
            type: "sqlite",
            database: ["SQLite", database_name_, ".db"].join(""),
            synchronize: true,
            logging: false,
            logger: "simple-console",
            entities: entities_array_,
            dropSchema: true
        });

        this.initialized_ = false;
    }

    async initialize(): Promise<DataSource>
    {
        this.initialized_ = true;

        return this.dataSource.initialize();
    }

    async destroy(): Promise<void>
    {
        this.initialized_ = false;

        return this.dataSource.destroy()
    }

    getDataSource(): DataSource
    {
        if (this.initialized_)
            return this.dataSource;
        else
            throw new Error("!initialized_");
    }
}
