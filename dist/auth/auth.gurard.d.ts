import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private readonly jwtService;
    private readonly usersService;
    constructor(reflector: Reflector, jwtService: JwtService, usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<any>;
}
