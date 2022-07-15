import { CoreOutput } from './output.dto';
import { Podcast } from '../entities/podcast.entity';
import { Episode } from '../entities/episode.entity';
export declare class GetAllPodcastsOutput extends CoreOutput {
    podcasts?: Podcast[];
}
declare const PodcastSearchInput_base: import("@nestjs/common").Type<Pick<Podcast, "id">>;
export declare class PodcastSearchInput extends PodcastSearchInput_base {
}
export declare class PodcastOutput extends CoreOutput {
    podcast?: Podcast;
}
export declare class EpisodesOutput extends CoreOutput {
    episodes?: Episode[];
}
export declare class EpisodesSearchInput {
    podcastId: number;
    episodeId: number;
}
export declare class GetEpisodeOutput extends CoreOutput {
    episode?: Episode;
}
export {};
