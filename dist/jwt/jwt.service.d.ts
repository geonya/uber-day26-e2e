import { JwtModuleOptions } from './jwt.interfaces';
export declare class JwtService {
    private readonly options;
    constructor(options: JwtModuleOptions);
    sign(userId: number): string;
    verify(token: string): any;
}
