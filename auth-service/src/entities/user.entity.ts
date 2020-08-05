import * as bcrypt from 'bcrypt'
import { Entity, PrimaryGeneratedColumn, Column, Unique, Generated } from "typeorm";
@Entity()
@Unique(["userName", "email"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Generated("uuid") operation_id: string;
    userGuid: string;
    @Column()
    userName: string;
    @Column()
    password: string;
    @Column()
    passwordSalt: string;
    @Column()
    email: string;
    @Column()
    createdAt: Date;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.passwordSalt);
        return hash === this.password;
    }
}