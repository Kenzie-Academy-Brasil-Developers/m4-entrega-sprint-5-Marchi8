import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Properties } from "./properties.entities";
import { User } from "./user.entity";

@Entity("schedules")
export class Schedules {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @CreateDateColumn({ type: "date" })
    date: string;

    @CreateDateColumn({ type: "time" })
    hour: string;

    @ManyToOne(() => Properties, property => property.schedules)
    property: Properties;

    @ManyToOne(() => User, user => user.schedules)
    user: User;

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}