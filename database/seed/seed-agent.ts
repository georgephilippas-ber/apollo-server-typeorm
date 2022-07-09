import {AgentManager} from "../entities-model/features/agent/manager/agent-manager";

export async function seedAuthentication(agentManager_: AgentManager)
{
    await agentManager_.insertAgent({
        username_: "root",
        password_: "root",
        passkey_: "root",
        email_: "root@root.com",
        surname_: "root",
        given_name_: "root"
    }, "(username | email) & password | passkey");
}
