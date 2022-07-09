import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../../product/schemas/product-schema";
import {Agent} from "../../agent/schemas/agent-schema";

@Entity()
export class Ingredient
{
    @PrimaryGeneratedColumn()
    id?: number;

    @OneToOne(type => Product)
    product!: Product; //the contained as ingredient

    @Column({type: "int", nullable: true})
    serving_index?: number;

    @Column({type: "int", nullable: true})
    serving_quantity?: number;

    @Column({type: "text", nullable: true})
    quantity?: string;

    @ManyToOne(() => Product, object => object.ingredients)
    product_relation_counterpart?: Product //the product this ingredient belongs to
}
