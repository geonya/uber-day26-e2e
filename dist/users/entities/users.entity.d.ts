import { CoreEntity } from './core.entity';
export declare enum UserRole {
    Host = "Host",
    Listener = "Listener"
}
export declare class Users extends CoreEntity {
    email: string;
    password: string;
    role: UserRole;
    hashPassword(): Promise<void>;
    checkPassword(aPassword: string): Promise<boolean>;
}
