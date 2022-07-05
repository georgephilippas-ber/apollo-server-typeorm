import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ProductPhoto
{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({type: "text", nullable: false, unique: true})
    identifier!: string;

    @Column({type: "text", nullable: false, unique: true})
    uri!: string;
}
