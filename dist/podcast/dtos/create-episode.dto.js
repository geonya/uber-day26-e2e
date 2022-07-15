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
exports.CreateEpisodeOutput = exports.CreateEpisodeInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const episode_entity_1 = require("../entities/episode.entity");
const output_dto_1 = require("./output.dto");
let CreateEpisodeInput = class CreateEpisodeInput extends graphql_1.PickType(episode_entity_1.Episode, ['title', 'category'], graphql_1.InputType) {
};
__decorate([
    graphql_1.Field(type => graphql_1.Int),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateEpisodeInput.prototype, "podcastId", void 0);
CreateEpisodeInput = __decorate([
    graphql_1.InputType()
], CreateEpisodeInput);
exports.CreateEpisodeInput = CreateEpisodeInput;
let CreateEpisodeOutput = class CreateEpisodeOutput extends output_dto_1.CoreOutput {
};
__decorate([
    graphql_1.Field(type => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateEpisodeOutput.prototype, "id", void 0);
CreateEpisodeOutput = __decorate([
    graphql_1.ObjectType()
], CreateEpisodeOutput);
exports.CreateEpisodeOutput = CreateEpisodeOutput;
//# sourceMappingURL=create-episode.dto.js.map