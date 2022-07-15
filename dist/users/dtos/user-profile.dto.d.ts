import { User } from '../entities/user.entity';
import { CoreOutput } from './output.dto';
export declare class UserProfileInput {
    userId: number;
}
export declare class UserProfileOutput extends CoreOutput {
    user?: User;
}
