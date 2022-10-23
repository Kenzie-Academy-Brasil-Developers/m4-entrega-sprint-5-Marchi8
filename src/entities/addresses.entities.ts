import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("addresses")
export class Addresses {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({ length: 60 })
    district: string;

    @Column({ length: 60 })
    zipCode: string;

    @Column({ nullable: true })
    number: string;

    @Column({ length: 60 })
    city: string;

    @Column({ length: 60 })
    state: string;

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}