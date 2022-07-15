import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createAccount(createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>;
    login(loginInpt: LoginInput): Promise<LoginOutput>;
    me(authUser: User): User;
    seeProfile(userProfileInput: UserProfileInput): Promise<UserProfileOutput>;
    editProfile(authUser: User, editProfileInput: EditProfileInput): Promise<EditProfileOutput>;
}
