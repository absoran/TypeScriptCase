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
    created_at ?: Date

    @Column()
    updated_at ?: Date

    @Column()
    deleted_at ?: Date

    @Column()
    is_active ?: boolean

    // constructor(userDto:any) {
    //     this.id = userDto.id
    //     this.name = userDto.name
    //     this.description = userDto.description
    //     this.price = userDto.price
    //     this.stock_count = userDto.stock_count
    // }
}