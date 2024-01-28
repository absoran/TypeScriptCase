import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import {CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";


@Entity()
export class ProductVariant{
    @PrimaryGeneratedColumn()
    id !: number
    @Column()
    product_id ?: number
    @Column()
    name !: string
    @Column()
    description ?: string
    @CreateDateColumn()
    created_at ?: Date
    @UpdateDateColumn()
    updated_at ?: Date
    @DeleteDateColumn()
    deleted_at ?: Date
}