import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

    @Column()
    created_at !: Date

    @Column()
    updated_at !: Date

    @Column()
    deleted_at !: Date

    @Column()
    is_active !: boolean
}