import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product
{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "text", nullable: false, unique: true})

    @OneToOne(() => NutritionalValue)
    @JoinColumn()
    nutritional_value?: NutritionalValue;
}

@Entity()
export class NutritionalValue
{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "float", nullable: false})
    energy!: number;

    @OneToOne(() => Carbohydrates, {cascade: true})
    @JoinColumn()
    carbohydrates!: Carbohydrates;

    @OneToOne(() => Fat, {cascade: true})
    @JoinColumn()
    fat!: Fat;

    @Column({type: "float", nullable: false})
    protein!: number;

    @OneToOne(() => Vitamins, {cascade: true})
    @JoinColumn()
    vitamins?: Vitamins;

    @OneToOne(() => Minerals, {cascade: true})
    @JoinColumn()
    minerals?: Minerals;
}

@Entity()
export class Carbohydrates
{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "float", nullable: false})
    remaining_carbohydrates!: number;

    @Column({type: "float", nullable: true})
    sugar!: number;

    @Column({type: "float", nullable: true})
    fibre!: number;
}

@Entity()
export class Fat
{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "float", nullable: false})
    remaining_fat!: number;

    @Column({type: "float", nullable: true})
    unsaturated!: number;

    @Column({type: "float", nullable: true})
    saturated!: number;

    @Column({type: "float", nullable: true})
    trans!: number;
}

@Entity()
export class Vitamins
{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "float", nullable: true})
    retinol?: number;

    @Column({type: "float", nullable: true})
    thiamin?: number;
    @Column({type: "float", nullable: true})
    riboflavin?: number;
    @Column({type: "float", nullable: true})
    niacin?: number;
    @Column({type: "float", nullable: true})
    pantothenicAcid?: number;
    @Column({type: "float", nullable: true})
    pyridoxine?: number;
    @Column({type: "float", nullable: true})
    biotin?: number;
    @Column({type: "float", nullable: true})
    folicAcid?: number;
    @Column({type: "float", nullable: true})
    cobalamin?: number;

    @Column({type: "float", nullable: true})
    ascorbicAcid?: number;

    @Column({type: "float", nullable: true})
    calciferol?: number;
}

@Entity()
export class Minerals
{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "float", nullable: true})
    calcium?: number;

    @Column({type: "float", nullable: true})
    iron?: number;

    @Column({type: "float", nullable: true})
    potassium?: number;
}
