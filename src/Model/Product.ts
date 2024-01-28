import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import {CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";
import {ProductVariant} from "./product-variant.ts";

// Product model is defined here with typeorm decorations.
// To define primary key added @PrimaryGeneratedColumn().
// To define data columns added XXDateColumn() and this columns are handled by typeorm.
// We can use options for define default value for columns e.g: is_active default value is true

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id !: number

    @Column()
    name !: string

    @Column()
    description ?: string

    @Column()
    price !: number

    @Column()
    stock_count !: number

    @CreateDateColumn()
    created_at ?: Date

    @UpdateDateColumn()
    updated_at ?: Date

    @DeleteDateColumn()
    deleted_at ?: Date

    @Column('boolean', {default: true})
    is_active ?: boolean

    variants ?: ProductVariant[];

}