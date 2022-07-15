import { Podcast } from '../entities/podcast.entity';
declare const UpdatePodcastPayload_base: import("@nestjs/common").Type<Partial<Pick<Podcast, "id" | "createdAt" | "updatedAt" | "title" | "category" | "rating" | "episodes">>>;
export declare class UpdatePodcastPayload extends UpdatePodcastPayload_base {
}
declare const UpdatePodcastInput_base: import("@nestjs/common").Type<Pick<Podcast, "id">>;
export declare class UpdatePodcastInput extends UpdatePodcastInput_base {
    payload: UpdatePodcastPayload;
}
export {};
