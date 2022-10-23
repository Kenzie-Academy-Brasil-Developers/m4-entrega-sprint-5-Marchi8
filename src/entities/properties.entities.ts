import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Addresses } from "./addresses.entities";
import { Categories } from "./categories.entities";
import { Schedules } from "./schedules.entities";

@Entity("properties")
export class Properties {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({ default: false })
    sold: boolean;

    @Column({ type: "decimal", precision: 12, scale: 2 })
    value: number;

    @Column()
    size: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Addresses, {
        eager: true
    }) @JoinColumn()
    address: Addresses;

    @ManyToOne(() => Categories, category => category.id)
    category: Categories;

    @OneToMany(() => Schedules, schedule => schedule.property)
    schedules: Schedules[];

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}