import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
    agent_id_?: number;

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
}
