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
exports.Episode = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const core_entity_1 = require("./core.entity");
const podcast_entity_1 = require("./podcast.entity");
let Episode = class Episode extends core_entity_1.CoreEntity {
};
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(type => String),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Episode.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(type => String),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Episode.prototype, "category", void 0);
__decorate([
    typeorm_1.ManyToOne(() => podcast_entity_1.Podcast, podcast => podcast.episodes, {
        onDelete: 'CASCADE',
    }),
    graphql_1.Field(type => podcast_entity_1.Podcast),
    __metadata("design:type", podcast_entity_1.Podcast)
], Episode.prototype, "podcast", void 0);
Episode = __decorate([
    typeorm_1.Entity(),
    graphql_1.ObjectType()
], Episode);
exports.Episode = Episode;
//# sourceMappingURL=episode.entity.js.map