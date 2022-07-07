import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

import {Encryption} from "../../../../../core/authentication/encryption/encryption";

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
