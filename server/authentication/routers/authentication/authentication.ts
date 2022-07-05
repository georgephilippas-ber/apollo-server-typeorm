import {Express} from "express";
import {AgentManager} from "../../../../database/database-model/features/agent/manager/agent-manager";

class Authentication
{
    expressApplication: Express;
    agentManager: AgentManager;

    constructor(expressApplication: Express, agentManager: AgentManager)
    {
        this.expressApplication = expressApplication;

        this.agentManager = agentManager;
    }
}
