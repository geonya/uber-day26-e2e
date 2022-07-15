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
exports.CreatePodcastOutput = exports.CreatePodcastInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const podcast_entity_1 = require("../entities/podcast.entity");
const output_dto_1 = require("./output.dto");
let CreatePodcastInput = class CreatePodcastInput extends graphql_1.PickType(podcast_entity_1.Podcast, ['title', 'category'], graphql_1.InputType) {
};
CreatePodcastInput = __decorate([
    graphql_1.InputType()
], CreatePodcastInput);
exports.CreatePodcastInput = CreatePodcastInput;
let CreatePodcastOutput = class CreatePodcastOutput extends output_dto_1.CoreOutput {
};
__decorate([
    graphql_1.Field(type => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreatePodcastOutput.prototype, "id", void 0);
CreatePodcastOutput = __decorate([
    graphql_1.ObjectType()
], CreatePodcastOutput);
exports.CreatePodcastOutput = CreatePodcastOutput;
//# sourceMappingURL=create-podcast.dto.js.map