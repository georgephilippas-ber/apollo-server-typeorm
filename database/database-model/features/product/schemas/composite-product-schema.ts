import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class CompositeProduct
{
    @PrimaryGeneratedColumn()
    id?: number;


}