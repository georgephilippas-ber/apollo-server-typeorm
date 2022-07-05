import express, {Express} from "express";

import {Agent} from "../../../../database/database-model/features/agent/schemas/agent-schema";
import {AgentManager} from "../../../../database/database-model/features/agent/manager/agent-manager";

import {StatusCodes, getReasonPhrase} from "http-status-codes";

import {TokenFactory} from "../../../../core/token/token";

import {Router} from "express";

import {specifies} from "../../../../core/utilities/utilities";

class AuthenticationRouter
{
    expressApplication: Express;

    agentManager: AgentManager;

    authenticationRouter: Router;

    constructor(expressApplication: Express, agentManager: AgentManager)
    {
        this.expressApplication = expressApplication;

        this.authenticationRouter = express.Router();

        this.expressApplication.use(this.authenticationRouter);

        this.agentManager = agentManager;
    }

    login()
    {
        this.authenticationRouter.post("/login", async (req, res) =>
        {
            let credentials_: string[];

            if (!specifies(req.body, ["credentials"]))
            {
                res.status(StatusCodes.BAD_REQUEST).send({status: getReasonPhrase(StatusCodes.BAD_REQUEST)});

                return;
            }
            else
                credentials_ = req.body["credentials"];

            let agent_: Agent | null = null;

            switch (credentials_.length)
            {
                case 0:
                    res.status(StatusCodes.BAD_REQUEST).send({status: getReasonPhrase(StatusCodes.BAD_REQUEST)});
                    break;
                case 1:
                    agent_ = await this.agentManager.authenticateByPasskey(credentials_[0]);

                    if (agent_)
                    {
                        res.send({
                            status: getReasonPhrase(StatusCodes.OK),
                            given_name_: agent_.given_name_,
                            surname_: agent_.surname_,
                            username_: agent_.username_,
                            email_: agent_.email_,
                            token: TokenFactory.createToken(agent_, true)
                        });
                    }
                    else
                        res.status(StatusCodes.UNAUTHORIZED).send({status: getReasonPhrase(StatusCodes.UNAUTHORIZED)});
                    break;
                case 2:
                    agent_ = await this.agentManager.authenticateByPassword(credentials_[0], credentials_[1])

                    if (agent_)
                    {
                        res.send({
                            status: getReasonPhrase(StatusCodes.OK),
                            given_name: agent_.given_name_,
                            surname_: agent_.surname_,
                            username_: agent_.username_,
                            email_: agent_.email_,
                            token: TokenFactory.createToken(agent_, true)
                        });
                    }
                    else
                        res.status(StatusCodes.UNAUTHORIZED).send({status: getReasonPhrase(StatusCodes.UNAUTHORIZED)});
                    break;
                default:
                    res.status(StatusCodes.REQUEST_TOO_LONG).send({status: getReasonPhrase(StatusCodes.REQUEST_TOO_LONG)});
            }
        })
    }

}
