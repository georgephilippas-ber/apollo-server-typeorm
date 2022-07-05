import {Agent} from "../../database/database-model/features/agent/schemas/agent-schema";

import * as jwt from 'jsonwebtoken';
import {isolate, specifies} from "../utilities/utilities";

import {authenticationConfiguration} from "../../configuration/configuration";

export type token_payload_type_ =
    {
        agent_id_: number;
        refresh_: boolean;
    }

export class TokenFactory
{
    public static createToken(agent_: Agent, refresh_: boolean, expiration_minutes_: number = authenticationConfiguration.token_expiration_minutes): string
    {
        if (!specifies(agent_, ["agent_id_"]))
            throw new Error("invalid agent_id_");

        let payload_: token_payload_type_ = {agent_id_: agent_.agent_id_, refresh_: refresh_}

        return jwt.sign(payload_, authenticationConfiguration.secretOrPrivateKey, {expiresIn: expiration_minutes_ + " minutes"});
    }

    public static obtainPayload(jsonwebtoken_: string): token_payload_type_ | null
    {
        try
        {
            let payload_: any = jwt.verify(jsonwebtoken_, authenticationConfiguration.secretOrPrivateKey);

            if (!specifies(payload_, ["agent_id_", "refresh_"]))
                return null;
            else
                return isolate(payload_, ["agent_id_", "refresh_"]) as token_payload_type_;
        } catch (e)
        {
            return null;
        }
    }
}
