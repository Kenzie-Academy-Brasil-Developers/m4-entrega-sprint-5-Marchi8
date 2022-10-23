import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Schedules } from "./schedules.entities";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {
    @Column({ length: 60 })
    name: string;

    @Column({ length: 80, unique: true })
    email: string;

    @Column({ length: 60 })
    password: string;

    @Column()
    isAdm: boolean;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @OneToMany(() => Schedules, schedule => schedule.property,)
    schedules: Schedules[];

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}