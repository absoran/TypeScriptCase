import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import {CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";

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

}