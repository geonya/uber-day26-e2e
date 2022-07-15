import { UsersService } from './users.service';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createAccount(createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>;
    login(loginInpt: LoginInput): Promise<LoginOutput>;
}
