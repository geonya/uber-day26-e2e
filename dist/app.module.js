"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const podcasts_module_1 = require("./podcast/podcasts.module");
const typeorm_1 = require("@nestjs/typeorm");
const podcast_entity_1 = require("./podcast/entities/podcast.entity");
const episode_entity_1 = require("./podcast/entities/episode.entity");
const user_entity_1 = require("./users/entities/user.entity");
const users_module_1 = require("./users/users.module");
const jwt_module_1 = require("./jwt/jwt.module");
const jwt_middleware_1 = require("./jwt/jwt.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(jwt_middleware_1.JwtMiddleware).forRoutes({
            path: '/graphql',
            method: common_1.RequestMethod.POST,
        });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: process.env.NODE_ENV === 'test' ? 'test.db.sqlite3' : 'db.sqlite3',
                synchronize: true,
                logging: process.env.NODE_ENV !== 'test',
                entities: [podcast_entity_1.Podcast, episode_entity_1.Episode, user_entity_1.User],
            }),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: true,
                context: ({ req }) => {
                    return { user: req['user'] };
                },
            }),
            jwt_module_1.JwtModule.forRoot({
                privateKey: '8mMJe5dMGORyoRPLvngA8U4aLTF3WasX',
            }),
            podcasts_module_1.PodcastsModule,
            users_module_1.UsersModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map