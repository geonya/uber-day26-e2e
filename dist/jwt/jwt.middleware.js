"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtMiddleware = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_service_1 = require("./jwt.service");
let JwtMiddleware = class JwtMiddleware {
    constructor(jwtService, usersService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async use(req, res, next) {
        if ('x-jwt' in req.headers) {
            const token = req.headers['x-jwt'];
            try {
                const decoded = this.jwtService.verify(token.toString());
                if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                    const { user, ok } = await this.usersService.findById(decoded['id']);
                    if (ok) {
                        req['user'] = user;
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        next();
    }
};
JwtMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService,
        users_service_1.UsersService])
], JwtMiddleware);
exports.JwtMiddleware = JwtMiddleware;
//# sourceMappingURL=jwt.middleware.js.map