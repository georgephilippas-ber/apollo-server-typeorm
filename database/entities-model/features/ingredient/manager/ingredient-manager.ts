import {Manager} from "../../../../interface/manager";
import {DatabaseProvider} from "../../../../database-provider";

export class IngredientManager extends Manager
{
    constructor(databaseProvider: DatabaseProvider)
    {
        super(databaseProvider);
    }
}
