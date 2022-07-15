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
exports.EpisodeResolver = exports.PodcastsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const podcasts_service_1 = require("./podcasts.service");
const podcast_entity_1 = require("./entities/podcast.entity");
const create_podcast_dto_1 = require("./dtos/create-podcast.dto");
const output_dto_1 = require("./dtos/output.dto");
const podcast_dto_1 = require("./dtos/podcast.dto");
const update_podcast_dto_1 = require("./dtos/update-podcast.dto");
const episode_entity_1 = require("./entities/episode.entity");
const create_episode_dto_1 = require("./dtos/create-episode.dto");
const update_episode_dto_1 = require("./dtos/update-episode.dto");
let PodcastsResolver = class PodcastsResolver {
    constructor(podcastsService) {
        this.podcastsService = podcastsService;
    }
    getAllPodcasts() {
        return this.podcastsService.getAllPodcasts();
    }
    createPodcast(createPodcastInput) {
        return this.podcastsService.createPodcast(createPodcastInput);
    }
    getPodcast(podcastSearchInput) {
        return this.podcastsService.getPodcast(podcastSearchInput.id);
    }
    deletePodcast(podcastSearchInput) {
        return this.podcastsService.deletePodcast(podcastSearchInput.id);
    }
    updatePodcast(updatePodcastInput) {
        return this.podcastsService.updatePodcast(updatePodcastInput);
    }
};
__decorate([
    graphql_1.Query(returns => podcast_dto_1.GetAllPodcastsOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PodcastsResolver.prototype, "getAllPodcasts", null);
__decorate([
    graphql_1.Mutation(returns => create_podcast_dto_1.CreatePodcastOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_podcast_dto_1.CreatePodcastInput]),
    __metadata("design:returntype", Promise)
], PodcastsResolver.prototype, "createPodcast", null);
__decorate([
    graphql_1.Query(returns => podcast_dto_1.PodcastOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [podcast_dto_1.PodcastSearchInput]),
    __metadata("design:returntype", Promise)
], PodcastsResolver.prototype, "getPodcast", null);
__decorate([
    graphql_1.Mutation(returns => output_dto_1.CoreOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [podcast_dto_1.PodcastSearchInput]),
    __metadata("design:returntype", Promise)
], PodcastsResolver.prototype, "deletePodcast", null);
__decorate([
    graphql_1.Mutation(returns => output_dto_1.CoreOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_podcast_dto_1.UpdatePodcastInput]),
    __metadata("design:returntype", Promise)
], PodcastsResolver.prototype, "updatePodcast", null);
PodcastsResolver = __decorate([
    graphql_1.Resolver(of => podcast_entity_1.Podcast),
    __metadata("design:paramtypes", [podcasts_service_1.PodcastsService])
], PodcastsResolver);
exports.PodcastsResolver = PodcastsResolver;
let EpisodeResolver = class EpisodeResolver {
    constructor(podcastService) {
        this.podcastService = podcastService;
    }
    getEpisodes(podcastSearchInput) {
        return this.podcastService.getEpisodes(podcastSearchInput.id);
    }
    createEpisode(createEpisodeInput) {
        return this.podcastService.createEpisode(createEpisodeInput);
    }
    updateEpisode(updateEpisodeInput) {
        return this.podcastService.updateEpisode(updateEpisodeInput);
    }
    deleteEpisode(episodesSearchInput) {
        return this.podcastService.deleteEpisode(episodesSearchInput);
    }
};
__decorate([
    graphql_1.Query(returns => podcast_dto_1.EpisodesOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [podcast_dto_1.PodcastSearchInput]),
    __metadata("design:returntype", Promise)
], EpisodeResolver.prototype, "getEpisodes", null);
__decorate([
    graphql_1.Mutation(returns => create_episode_dto_1.CreateEpisodeOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_episode_dto_1.CreateEpisodeInput]),
    __metadata("design:returntype", Promise)
], EpisodeResolver.prototype, "createEpisode", null);
__decorate([
    graphql_1.Mutation(returns => output_dto_1.CoreOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_episode_dto_1.UpdateEpisodeInput]),
    __metadata("design:returntype", Promise)
], EpisodeResolver.prototype, "updateEpisode", null);
__decorate([
    graphql_1.Mutation(returns => output_dto_1.CoreOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [podcast_dto_1.EpisodesSearchInput]),
    __metadata("design:returntype", Promise)
], EpisodeResolver.prototype, "deleteEpisode", null);
EpisodeResolver = __decorate([
    graphql_1.Resolver(of => episode_entity_1.Episode),
    __metadata("design:paramtypes", [podcasts_service_1.PodcastsService])
], EpisodeResolver);
exports.EpisodeResolver = EpisodeResolver;
//# sourceMappingURL=podcasts.resolver.js.map