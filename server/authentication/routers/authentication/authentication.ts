import express, {Express, NextFunction} from "express";

import * as jwt from 'jsonwebtoken';

import {
    Agent,
    authentication_method_type_
} from "../../../../database/entities-model/features/agent/schemas/agent-schema";
import {AgentManager} from "../../../../database/entities-model/features/agent/manager/agent-manager";

import {StatusCodes, getReasonPhrase} from "http-status-codes";

import {TokenFactory} from "../../../../core/authentication/token/token";

import {Router} from "express";

import {isolate, specifies, toInteger} from "../../../../core/utilities/utilities";
import {authenticationConfiguration} from "../../../../configuration/authentication";

export class AuthenticationRoute
{
    application_: Express;
    endpoint_: string;
    router_: Router;

    agentManager: AgentManager;

    constructor(expressApplication: Express, agentManager: AgentManager, router_endpoint_: string = "authentication")
    {
        this.application_ = expressApplication;

        this.endpoint_ = router_endpoint_;

        this.router_ = express.Router();

        this.router_.use(express.json());

        this.register_routes();

        this.agentManager = agentManager;
    }

    public register_router()
    {
        this.application_.use("/" + this.endpoint_, this.router_);
    }

    register_routes()
    {
        this.login();
        this.refresh();
        this.register();
        this.protected_route();
    }

    login()
    {
        this.router_.post("/login", async (req, res) =>
        {
            let credentials_: string[];

            if (!specifies(req.body, ["credentials"]))
            {
                res.status(StatusCodes.BAD_REQUEST).send({status: getReasonPhrase(StatusCodes.BAD_REQUEST)});

                return;
            } else
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
                    } else
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
                    } else
                        res.status(StatusCodes.UNAUTHORIZED).send({status: getReasonPhrase(StatusCodes.UNAUTHORIZED)});
                    break;
                default:
                    res.status(StatusCodes.REQUEST_TOO_LONG).send({status: getReasonPhrase(StatusCodes.REQUEST_TOO_LONG)});
            }
        })
    }

    refresh()
    {
        this.router_.all("/refresh", async (req, res) =>
        {
            let expiration_minutes_: number | undefined = toInteger(req.query["expiration_minutes"]) ?? authenticationConfiguration.token_expiration_minutes;

            if (req.headers[authenticationConfiguration.authenticationHeader] && typeof req.headers[authenticationConfiguration.authenticationHeader] == "string")
            {
                let agent_: Agent | null = await this.agentManager.authenticateByToken(req.headers[authenticationConfiguration.authenticationHeader] as string, true);

                if (agent_)
                    res.send({
                        status: getReasonPhrase(StatusCodes.OK),
                        token: TokenFactory.createToken(agent_, true, expiration_minutes_)
                    });
                else
                    res.status(StatusCodes.UNAUTHORIZED).send({status: getReasonPhrase(StatusCodes.UNAUTHORIZED)});

            } else
                res.status(StatusCodes.BAD_REQUEST).send({status: getReasonPhrase(StatusCodes.BAD_REQUEST)});
        });
    }

    register()
    {
        this.router_.post("/register", async (req, res) =>
        {
            if (specifies(req.body, ["given_name_", "surname_", "email_", "username_", "password_"]))
            {
                if ((await this.agentManager.byUsername(req.body["username_"])).length > 0 ||
                    (await this.agentManager.byEmail(req.body["email_"])).length > 0)
                    res.status(StatusCodes.CONFLICT).send({error: getReasonPhrase(StatusCodes.CONFLICT)});
                else
                {
                    let candidate_agent_ = isolate(req.body, ["given_name_", "surname_", "email_", "username_", "password_", "passkey_"]);

                    let authentication_method_: authentication_method_type_ = candidate_agent_.passkey_ ? "(username | email) & password | passkey" : "(username | email) & password";

                    if (await this.agentManager.insertAgent(candidate_agent_, authentication_method_))
                        res.status(StatusCodes.OK).send();
                    else
                        res.status(StatusCodes.CONFLICT).send({error: getReasonPhrase(StatusCodes.CONFLICT)});
                }

            } else
                res.status(StatusCodes.BAD_REQUEST).send({error: getReasonPhrase(StatusCodes.BAD_REQUEST)});
        })
    }

    protected_route()
    {
        this.router_.all("/protected", async (req, res) =>
        {
            let response_json_: any = {
                request_headers: req.headers,
                request_body: req.body
            };

            if (!(req.headers[authenticationConfiguration.authenticationHeader] && typeof req.headers[authenticationConfiguration.authenticationHeader] === "string"))
            {
                response_json_["error"] = authenticationConfiguration.authenticationHeader + " header error";
            } else
            {
                try
                {
                    response_json_["authentication-content"] = jwt.verify(req.headers[authenticationConfiguration.authenticationHeader] as string, authenticationConfiguration.secretOrPrivateKey)
                } catch (e)
                {
                    response_json_["error"] = "invalid authentication";
                    try
                    {
                        response_json_["invalid-authentication-content"] = jwt.decode(req.headers[authenticationConfiguration.authenticationHeader] as string)
                    } catch (e)
                    {

                    }
                }
            }

            res.send(response_json_);
        })
    }
}
