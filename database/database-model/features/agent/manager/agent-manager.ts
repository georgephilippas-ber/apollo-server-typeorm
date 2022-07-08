import {DatabaseProvider} from "../../../../database-provider";
import {Agent, authentication_method_type_} from "../schemas/agent-schema";

import {Encryption} from "../../../../../core/authentication/encryption/encryption";

import {token_payload_type_, TokenFactory} from "../../../../../core/authentication/token/token";

import {UpdateResult} from "typeorm";

function isStringEmail(string_: string): boolean
{
    return /\S+@\S+.\S+/.test(string_);
}

export type candidate_agent_type_ =
    {
        given_name_: string;
        surname_: string;
        username_: string;
        email_: string;
        password_: string;
        passkey_?: string;
    }

export class AgentManager
{
    databaseProvider_: DatabaseProvider;

    constructor(databaseProvider_: DatabaseProvider)
    {
        this.databaseProvider_ = databaseProvider_;
    }

    async all(): Promise<Agent[]>
    {
        return this.databaseProvider_.getDataSource().getRepository(Agent).find();
    }

    async byAgentId(agent_id_: number): Promise<Agent[]>
    {
        return this.databaseProvider_.getDataSource().getRepository(Agent).createQueryBuilder("agent").where("agent.agent_id_ = :agent_id_", {agent_id_: agent_id_}).getMany();
    }

    async byPasskey(passkey_: string): Promise<Agent[]>
    {
        //return this.databaseProvider_.getDataSource().getRepository(Agent).createQueryBuilder("agent").where("agent.passkey_hash_ = :passkey_hash_", {passkey_hash_: Encryption.hash_passkey(passkey_)}).getMany()

        return this.databaseProvider_.getDataSource().getRepository(Agent).find({
            where: {
                passkey_hash_: Encryption.hash_passkey(passkey_)
            }
        });

    }

    async byUsername(username_: string): Promise<Agent[]>
    {
        // return this.databaseProvider_.getDataSource().getRepository(Agent).createQueryBuilder("agent").where("agent.username_ = :username_", {username_: username_}).getMany();

        return this.databaseProvider_.getDataSource().getRepository(Agent).find({
            where: {
                username_: username_
            }
        });
    }

    async byEmail(email_: string): Promise<Agent[]>
    {
        return this.databaseProvider_.getDataSource().getRepository(Agent).createQueryBuilder("agent").where("agent.email_ = :email_", {email_: email_}).getMany();
    }

    async authenticateByPasskey(passkey_: string): Promise<Agent | null>
    {
        let query_result_: Agent[] = await this.byPasskey(passkey_);

        if (query_result_.length == 1)
        {
            let agent_: Agent = query_result_[0];

            return agent_.authentication_method_.includes("passkey") && agent_.active_ ? agent_ : null;
        } else
            return null;
    }

    async authenticateByPassword(username_or_email_: string, password_: string): Promise<Agent | null>
    {
        let query_result_: Agent[] = isStringEmail(username_or_email_) ? await this.byEmail(username_or_email_) : await this.byUsername(username_or_email_);

        if (query_result_.length == 1 && query_result_[0].password_hash_ && query_result_[0].authentication_method_.includes("password") && query_result_[0].active_)
            return Encryption.verify_password(password_, query_result_[0].password_hash_) ? query_result_[0] : null;
        else
            return null;
    }

    async authenticateByToken(jsonwebtoken_: string, requires_refresh_: boolean = false): Promise<Agent | null>
    {
        let payload_: token_payload_type_ | null = TokenFactory.obtainPayload(jsonwebtoken_);

        if (!payload_ || (requires_refresh_ && !payload_.refresh_))
            return null;

        let query_result_: Agent[] = await this.byAgentId(payload_.agent_id_);

        if (query_result_.length == 1)
            return query_result_[0];
        else
            return null;
    }

    async activateAgent(agent_id_: number): Promise<UpdateResult>
    {
        return this.databaseProvider_.getDataSource().getRepository(Agent).update({agent_id_: agent_id_}, {active_: true});
    }

    async deactivateAgent(agent_id_: number): Promise<UpdateResult>
    {
        return this.databaseProvider_.getDataSource().getRepository(Agent).update({agent_id_: agent_id_}, {active_: false});
    }

    async insertAgent(candidate_agent_: candidate_agent_type_, authentication_method_: authentication_method_type_): Promise<Agent | null>
    {
        if ((await this.byUsername(candidate_agent_.username_)).length > 0 || (await this.byEmail(candidate_agent_.email_)).length > 0 ||
            (await this.byEmail(candidate_agent_.email_)).length > 0)
            return null;
        else
        {
            let agent_: Agent = {
                username_: candidate_agent_.username_,
                email_: candidate_agent_.email_,
                given_name_: candidate_agent_.given_name_,
                surname_: candidate_agent_.surname_,
                password_hash_: candidate_agent_.password_ ? Encryption.hash_password(candidate_agent_.password_) : undefined,
                passkey_hash_: candidate_agent_.passkey_ ? Encryption.hash_passkey(candidate_agent_.passkey_) : undefined,
                authentication_method_: authentication_method_,
                active_: true
            }

            return this.databaseProvider_.getDataSource().getRepository(Agent).save(agent_);
        }
    }
}
