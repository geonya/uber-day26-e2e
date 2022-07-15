"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcastsModule = void 0;
const common_1 = require("@nestjs/common");
const podcasts_service_1 = require("./podcasts.service");
const podcasts_resolver_1 = require("./podcasts.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const podcast_entity_1 = require("./entities/podcast.entity");
const episode_entity_1 = require("./entities/episode.entity");
let PodcastsModule = class PodcastsModule {
};
PodcastsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([podcast_entity_1.Podcast, episode_entity_1.Episode])],
        providers: [podcasts_service_1.PodcastsService, podcasts_resolver_1.PodcastsResolver, podcasts_resolver_1.EpisodeResolver],
    })
], PodcastsModule);
exports.PodcastsModule = PodcastsModule;
//# sourceMappingURL=podcasts.module.js.map