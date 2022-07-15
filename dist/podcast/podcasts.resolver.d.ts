import { PodcastsService } from './podcasts.service';
import { CreatePodcastInput, CreatePodcastOutput } from './dtos/create-podcast.dto';
import { CoreOutput } from './dtos/output.dto';
import { PodcastSearchInput, PodcastOutput, EpisodesOutput, EpisodesSearchInput, GetAllPodcastsOutput } from './dtos/podcast.dto';
import { UpdatePodcastInput } from './dtos/update-podcast.dto';
import { CreateEpisodeInput, CreateEpisodeOutput } from './dtos/create-episode.dto';
import { UpdateEpisodeInput } from './dtos/update-episode.dto';
export declare class PodcastsResolver {
    private readonly podcastsService;
    constructor(podcastsService: PodcastsService);
    getAllPodcasts(): Promise<GetAllPodcastsOutput>;
    createPodcast(createPodcastInput: CreatePodcastInput): Promise<CreatePodcastOutput>;
    getPodcast(podcastSearchInput: PodcastSearchInput): Promise<PodcastOutput>;
    deletePodcast(podcastSearchInput: PodcastSearchInput): Promise<CoreOutput>;
    updatePodcast(updatePodcastInput: UpdatePodcastInput): Promise<CoreOutput>;
}
export declare class EpisodeResolver {
    private readonly podcastService;
    constructor(podcastService: PodcastsService);
    getEpisodes(podcastSearchInput: PodcastSearchInput): Promise<EpisodesOutput>;
    createEpisode(createEpisodeInput: CreateEpisodeInput): Promise<CreateEpisodeOutput>;
    updateEpisode(updateEpisodeInput: UpdateEpisodeInput): Promise<CoreOutput>;
    deleteEpisode(episodesSearchInput: EpisodesSearchInput): Promise<CoreOutput>;
}
