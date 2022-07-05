import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product, ProductCategory} from "./product-schema";

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
