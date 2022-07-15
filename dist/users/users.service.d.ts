import { User } from './entities/user.entity';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { Repository } from 'typeorm';
import { JwtService } from '../jwt/jwt.service';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
export declare class UsersService {
    private readonly users;
    private readonly jwtService;
    constructor(users: Repository<User>, jwtService: JwtService);
    createAccount({ email, password, role, }: CreateAccountInput): Promise<CreateAccountOutput>;
    login({ email, password }: LoginInput): Promise<LoginOutput>;
    findById(id: number): Promise<UserProfileOutput>;
    editProfile(userId: number, { email, password }: EditProfileInput): Promise<EditProfileOutput>;
}
