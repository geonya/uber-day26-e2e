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
exports.GetEpisodeOutput = exports.EpisodesSearchInput = exports.EpisodesOutput = exports.PodcastOutput = exports.PodcastSearchInput = exports.GetAllPodcastsOutput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("./output.dto");
const podcast_entity_1 = require("../entities/podcast.entity");
const class_validator_1 = require("class-validator");
let GetAllPodcastsOutput = class GetAllPodcastsOutput extends output_dto_1.CoreOutput {
};
__decorate([
    graphql_1.Field(type => [podcast_entity_1.Podcast], { nullable: true }),
    __metadata("design:type", Array)
], GetAllPodcastsOutput.prototype, "podcasts", void 0);
GetAllPodcastsOutput = __decorate([
    graphql_1.ObjectType()
], GetAllPodcastsOutput);
exports.GetAllPodcastsOutput = GetAllPodcastsOutput;
let PodcastSearchInput = class PodcastSearchInput extends graphql_1.PickType(podcast_entity_1.Podcast, ['id'], graphql_1.InputType) {
};
PodcastSearchInput = __decorate([
    graphql_1.InputType()
], PodcastSearchInput);
exports.PodcastSearchInput = PodcastSearchInput;
let PodcastOutput = class PodcastOutput extends output_dto_1.CoreOutput {
};
__decorate([
    graphql_1.Field(type => podcast_entity_1.Podcast, { nullable: true }),
    __metadata("design:type", podcast_entity_1.Podcast)
], PodcastOutput.prototype, "podcast", void 0);
PodcastOutput = __decorate([
    graphql_1.ObjectType()
], PodcastOutput);
exports.PodcastOutput = PodcastOutput;
let EpisodesOutput = class EpisodesOutput extends output_dto_1.CoreOutput {
};
__decorate([
    graphql_1.Field(type => [podcast_entity_1.Podcast], { nullable: true }),
    __metadata("design:type", Array)
], EpisodesOutput.prototype, "episodes", void 0);
EpisodesOutput = __decorate([
    graphql_1.ObjectType()
], EpisodesOutput);
exports.EpisodesOutput = EpisodesOutput;
let EpisodesSearchInput = class EpisodesSearchInput {
};
__decorate([
    graphql_1.Field(type => graphql_1.Int),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], EpisodesSearchInput.prototype, "podcastId", void 0);
__decorate([
    graphql_1.Field(type => graphql_1.Int),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], EpisodesSearchInput.prototype, "episodeId", void 0);
EpisodesSearchInput = __decorate([
    graphql_1.InputType()
], EpisodesSearchInput);
exports.EpisodesSearchInput = EpisodesSearchInput;
class GetEpisodeOutput extends output_dto_1.CoreOutput {
}
exports.GetEpisodeOutput = GetEpisodeOutput;
//# sourceMappingURL=podcast.dto.js.map