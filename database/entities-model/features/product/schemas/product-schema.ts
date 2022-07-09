import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";

import {NutritionalValue} from "./nutritional-value-schema";
import {ProductPhoto} from "./product-photo-schema";
import {Agent} from "../../agent/schemas/agent-schema";
import {Ingredient} from "../../ingredient/schemas/ingredient-schema";

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

    @Column({type: "text", nullable: false})
    product_quantity_type!: product_quantity_type_type_;

    @Column({type: "text", nullable: true})
    package_quantities?: string; //e.g. "75g, 125g"

    @Column({type: "text", nullable: false})
    serving_quantities!: string; //e.g. "30g"

    @ManyToMany(() => ProductPhoto, {eager: true, cascade: true})
    @JoinTable()
    photos?: ProductPhoto[];

    @OneToOne(() => NutritionalValue, {eager: true, cascade: true})
    @JoinColumn()
    nutritional_value?: NutritionalValue;

    @ManyToMany(() => ProductCategory, {eager: true, cascade: true})
    @JoinTable()
    categories?: ProductCategory[];

    @ManyToOne(() => Agent, {eager: true, cascade: true})
    agent?: Agent

    @OneToMany(() => Ingredient, object => object.product_relation_counterpart, {cascade: true, eager: true})
    ingredients?: Ingredient[]
}

@Entity()
export class ProductCategory
{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({type: "text", nullable: false, unique: true})
    category_name!: string;
}
