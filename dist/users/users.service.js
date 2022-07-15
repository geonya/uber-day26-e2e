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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./entities/users.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(users) {
        this.users = users;
    }
    async createAccount({ email, password, role, }) {
        try {
            const exists = await this.users.findOne({ email });
            if (exists) {
                return { ok: false, error: `There is a user with that email already` };
            }
            const user = this.users.create({
                email,
                password,
                role,
            });
            await this.users.save(user);
            return {
                ok: true,
                error: null,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not create account',
            };
        }
    }
    async login({ email, password }) {
        try {
            const user = await this.users.findOne({ email }, { select: ['id', 'password'] });
            if (!user) {
                return { ok: false, error: 'User not found' };
            }
            const passwordCorrect = await user.checkPassword(password);
            if (!passwordCorrect) {
                return {
                    ok: false,
                    error: 'Wrong password',
                };
            }
            return {
                ok: true,
                token: `testToken`,
            };
        }
        catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map