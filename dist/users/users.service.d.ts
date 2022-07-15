import { Users } from './entities/users.entity';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly users;
    constructor(users: Repository<Users>);
    createAccount({ email, password, role, }: CreateAccountInput): Promise<CreateAccountOutput>;
    login({ email, password }: LoginInput): Promise<LoginOutput>;
}
