import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

import {Encryption} from "../../../../../core/encryption/encryption";

import {faker} from "@faker-js/faker";

export type authentication_method_type_ =
    | "username & password"
    | "email & password"
    | "(username | email) & password"
    | "passkey"
    | "username & password | passkey"
    | "email & password | passkey"
    | "(username | email) & password | passkey";

@Entity()
export class Agent
{
    @PrimaryGeneratedColumn()
    agent_id_!: number;

    @Column({type: "integer", nullable: false})
    active_!: boolean;

    @Column({type: "varchar", nullable: true})
    given_name_!: string | undefined;

    @Column({type: "varchar", nullable: true})
    surname_!: string | undefined;

    @Column({type: "varchar", unique: true, nullable: true})
    passkey_hash_!: string | undefined;

    @Column({type: "varchar", unique: true, nullable: true})
    username_!: string | undefined;

    @Column({type: "varchar", unique: true, nullable: true})
    email_!: string | undefined;

    @Column({type: "varchar", unique: false, nullable: true})
    password_hash_!: string | undefined;

    @Column({type: "varchar", nullable: false})
    authentication_method_!: authentication_method_type_;

    public static byValues(given_name_?: string, surname_?: string, passkey_hash_?: string, username_?: string, email_?: string, password_hash_?: string, authentication_method_: authentication_method_type_ = "passkey", active_: boolean = true): Agent
    {
        let agent_ = new Agent();

        agent_.given_name_ = given_name_;
        agent_.surname_ = surname_;
        agent_.passkey_hash_ = passkey_hash_;
        agent_.username_ = username_;
        agent_.email_ = email_;
        agent_.password_hash_ = password_hash_;
        agent_.authentication_method_ = authentication_method_;
        agent_.active_ = active_;

        return agent_;
    }
}

export function fake_agent_array(quantity_: number, authentication_method_: authentication_method_type_): Agent[]
{
    return Array(quantity_).fill(0).map(value =>
    {
        let given_name_: string = faker.name.firstName(), surname_: string = faker.name.lastName();

        let passkey_: string | undefined = undefined, passkey_hash_: string | undefined = undefined;
        if (authentication_method_.includes("passkey"))
        {
            passkey_ = [faker.word.preposition(), faker.word.adjective(), faker.word.noun()].map(value => value.toLowerCase()).join("-");

            passkey_hash_ = Encryption.hash_passkey(passkey_);
        }

        let username_: string | undefined = authentication_method_.includes("username") ? faker.internet.userName(given_name_, surname_).toLowerCase() : undefined;

        let email_: string | undefined = authentication_method_.includes("email") ? faker.internet.email(given_name_, surname_).toLowerCase() : undefined;

        let password_: string | undefined = undefined, password_hash_: string | undefined = undefined;
        if (authentication_method_.includes("password"))
        {
            password_ = faker.internet.password(0x10);

            password_hash_ = Encryption.hash_password(password_);
        }

        console.log(given_name_, surname_);
        console.log("passkey_", passkey_);
        console.log("username_", username_);
        console.log("email_", email_);
        console.log("password_", password_);

        return Agent.byValues(given_name_, surname_, passkey_hash_, username_, email_, password_hash_, authentication_method_);
    })
}
