import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";

import {NutritionalValue} from "./nutritional-value-schema";
import {ProductPhoto} from "./product-photo";

type product_type_type_ = "generic" | "commercial";

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

    @ManyToMany(() => ProductPhoto, {eager: true, cascade: true})
    photos?: ProductPhoto[];

    @OneToOne(() => NutritionalValue, {eager: true, cascade: true})
    @JoinColumn()
    nutritional_value?: NutritionalValue;

    @ManyToMany(() => ProductCategory, {eager: true, cascade: true})
    @JoinTable()
    categories_?: ProductCategory[];
}

@Entity()
export class ProductCategory
{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({type: "text", nullable: false, unique: true})
    category_name!: string;
}
