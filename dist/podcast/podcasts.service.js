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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcastsService = void 0;
const common_1 = require("@nestjs/common");
const episode_entity_1 = require("./entities/episode.entity");
const podcast_entity_1 = require("./entities/podcast.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let PodcastsService = class PodcastsService {
    constructor(podcastRepository, episodeRepository) {
        this.podcastRepository = podcastRepository;
        this.episodeRepository = episodeRepository;
        this.InternalServerErrorOutput = {
            ok: false,
            error: 'Internal server error occurred.',
        };
    }
    async getAllPodcasts() {
        try {
            const podcasts = await this.podcastRepository.find();
            return {
                ok: true,
                podcasts,
            };
        }
        catch (e) {
            return this.InternalServerErrorOutput;
        }
    }
    async createPodcast({ title, category, }) {
        try {
            const newPodcast = this.podcastRepository.create({ title, category });
            const { id } = await this.podcastRepository.save(newPodcast);
            return {
                ok: true,
                id,
            };
        }
        catch (e) {
            return this.InternalServerErrorOutput;
        }
    }
    async getPodcast(id) {
        try {
            const podcast = await this.podcastRepository.findOne({ id }, { relations: ['episodes'] });
            if (!podcast) {
                return {
                    ok: false,
                    error: `Podcast with id ${id} not found`,
                };
            }
            return {
                ok: true,
                podcast,
            };
        }
        catch (e) {
            return this.InternalServerErrorOutput;
        }
    }
    async deletePodcast(id) {
        try {
            const { ok, error } = await this.getPodcast(id);
            if (!ok) {
                return { ok, error };
            }
            await this.podcastRepository.delete({ id });
            return { ok };
        }
        catch (e) {
            return this.InternalServerErrorOutput;
        }
    }
    async updatePodcast({ id, payload, }) {
        try {
            const { ok, error, podcast } = await this.getPodcast(id);
            if (!ok) {
                return { ok, error };
            }
            if (payload.rating !== null &&
                (payload.rating < 1 || payload.rating > 5)) {
                return {
                    ok: false,
                    error: 'Rating must be between 1 and 5.',
                };
            }
            else {
                const updatedPodcast = Object.assign(Object.assign({}, podcast), payload);
                await this.podcastRepository.save(updatedPodcast);
                return { ok };
            }
        }
        catch (e) {
            return this.InternalServerErrorOutput;
        }
    }
    async getEpisodes(podcastId) {
        const { podcast, ok, error } = await this.getPodcast(podcastId);
        if (!ok) {
            return { ok, error };
        }
        return {
            ok: true,
            episodes: podcast.episodes,
        };
    }
    async getEpisode({ podcastId, episodeId, }) {
        const { episodes, ok, error } = await this.getEpisodes(podcastId);
        if (!ok) {
            return { ok, error };
        }
        const episode = episodes.find(episode => episode.id === episodeId);
        if (!episode) {
            return {
                ok: false,
                error: `Episode with id ${episodeId} not found in podcast with id ${podcastId}`,
            };
        }
        return {
            ok: true,
            episode,
        };
    }
    async createEpisode({ podcastId, title, category, }) {
        try {
            const { podcast, ok, error } = await this.getPodcast(podcastId);
            if (!ok) {
                return { ok, error };
            }
            const newEpisode = this.episodeRepository.create({ title, category });
            newEpisode.podcast = podcast;
            const { id } = await this.episodeRepository.save(newEpisode);
            return {
                ok: true,
                id,
            };
        }
        catch (e) {
            return this.InternalServerErrorOutput;
        }
    }
    async deleteEpisode({ podcastId, episodeId, }) {
        try {
            const { episode, error, ok } = await this.getEpisode({
                podcastId,
                episodeId,
            });
            if (!ok) {
                return { ok, error };
            }
            await this.episodeRepository.delete({ id: episode.id });
            return { ok: true };
        }
        catch (e) {
            return this.InternalServerErrorOutput;
        }
    }
    async updateEpisode(_a) {
        var { podcastId, episodeId } = _a, rest = __rest(_a, ["podcastId", "episodeId"]);
        try {
            const { episode, ok, error } = await this.getEpisode({
                podcastId,
                episodeId,
            });
            if (!ok) {
                return { ok, error };
            }
            const updatedEpisode = Object.assign(Object.assign({}, episode), rest);
            await this.episodeRepository.save(updatedEpisode);
            return { ok: true };
        }
        catch (e) {
            return this.InternalServerErrorOutput;
        }
    }
};
PodcastsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(podcast_entity_1.Podcast)),
    __param(1, typeorm_1.InjectRepository(episode_entity_1.Episode)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PodcastsService);
exports.PodcastsService = PodcastsService;
//# sourceMappingURL=podcasts.service.js.map