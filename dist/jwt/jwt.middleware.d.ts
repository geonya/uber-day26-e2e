import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from './jwt.service';
export declare class JwtMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
