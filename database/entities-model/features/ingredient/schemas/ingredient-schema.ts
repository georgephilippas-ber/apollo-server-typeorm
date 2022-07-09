import {Tree, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, ManyToOne} from "typeorm";
import {Product} from "../../product/schemas/product-schema";
import {Agent} from "../../agent/schemas/agent-schema";

@Entity()
export class Ingredient
{
    @PrimaryGeneratedColumn()
    id?: number;

    @OneToOne(() => Product, {eager: true, cascade: true})
    @JoinColumn()
    product?: Product; //product contained as ingredient

    @OneToOne(() => Agent, {eager: true, cascade: true})
    @JoinColumn()
    agent?: Agent;

    @Column({type: "int", nullable: true})
    servings_selector?: number;

    @Column({type: "int", nullable: true})
    servings_quantity?: number;

    @Column({type: "text", nullable: true})
    quantity?: string;

    @ManyToOne(() => Product, object => object.ingredients)
    product_foreign_?: Product //the product this ingredient belongs to
}
