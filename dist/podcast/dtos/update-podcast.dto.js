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
exports.UpdatePodcastInput = exports.UpdatePodcastPayload = void 0;
const graphql_1 = require("@nestjs/graphql");
const podcast_entity_1 = require("../entities/podcast.entity");
let UpdatePodcastPayload = class UpdatePodcastPayload extends graphql_1.PartialType(graphql_1.PickType(podcast_entity_1.Podcast, ['title', 'category', 'rating'], graphql_1.InputType)) {
};
UpdatePodcastPayload = __decorate([
    graphql_1.InputType()
], UpdatePodcastPayload);
exports.UpdatePodcastPayload = UpdatePodcastPayload;
let UpdatePodcastInput = class UpdatePodcastInput extends graphql_1.PickType(podcast_entity_1.Podcast, ['id'], graphql_1.InputType) {
};
__decorate([
    graphql_1.Field(type => UpdatePodcastPayload),
    __metadata("design:type", UpdatePodcastPayload)
], UpdatePodcastInput.prototype, "payload", void 0);
UpdatePodcastInput = __decorate([
    graphql_1.InputType()
], UpdatePodcastInput);
exports.UpdatePodcastInput = UpdatePodcastInput;
//# sourceMappingURL=update-podcast.dto.js.map