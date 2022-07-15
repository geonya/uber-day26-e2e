import { Users } from '../entities/users.entity';
import { CoreOutput } from './output.dto';
declare const CreateAccountInput_base: import("@nestjs/common").Type<Partial<Users>>;
export declare class CreateAccountInput extends CreateAccountInput_base {
}
export declare class CreateAccountOutput extends CoreOutput {
}
export {};
