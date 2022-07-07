import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";

import {NutritionalValue} from "./nutritional-value-schema";
import {ProductPhoto} from "./product-photo-schema";

type product_type_type_ = "generic" | "commercial";

type product_quantity_type_type_ = "mass" | "volume";

@Entity()
export class Product
{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({type: "text", nullable: false, unique: true})
    name!: string;

    @Column({type: "text", nullable: true})
    warning?: string;

    @Column({type: "text", nullable: false, unique: true, default: "commercial"})
    product_type?: product_type_type_;

    @Column({type: "text", nullable: false, unique: true})
    product_quantity_type?: product_quantity_type_type_;

    @ManyToMany(() => ProductPhoto, {eager: true, cascade: true})
    @JoinTable()
    photos?: ProductPhoto[];

    @OneToOne(() => NutritionalValue, {eager: true, cascade: true})
    @JoinColumn()
    nutritional_value?: NutritionalValue;

    @ManyToMany(() => ProductCategory, {eager: true, cascade: true})
    @JoinTable()
    categories?: ProductCategory[];


}

@Entity()
export class ProductCategory
{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({type: "text", nullable: false, unique: true})
    category_name!: string;
}
