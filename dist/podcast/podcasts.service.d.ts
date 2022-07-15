import { CreateEpisodeInput, CreateEpisodeOutput } from './dtos/create-episode.dto';
import { CreatePodcastInput, CreatePodcastOutput } from './dtos/create-podcast.dto';
import { UpdateEpisodeInput } from './dtos/update-episode.dto';
import { UpdatePodcastInput } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { CoreOutput } from './dtos/output.dto';
import { PodcastOutput, EpisodesOutput, EpisodesSearchInput, GetAllPodcastsOutput, GetEpisodeOutput } from './dtos/podcast.dto';
import { Repository } from 'typeorm';
export declare class PodcastsService {
    private readonly podcastRepository;
    private readonly episodeRepository;
    constructor(podcastRepository: Repository<Podcast>, episodeRepository: Repository<Episode>);
    private readonly InternalServerErrorOutput;
    getAllPodcasts(): Promise<GetAllPodcastsOutput>;
    createPodcast({ title, category, }: CreatePodcastInput): Promise<CreatePodcastOutput>;
    getPodcast(id: number): Promise<PodcastOutput>;
    deletePodcast(id: number): Promise<CoreOutput>;
    updatePodcast({ id, payload, }: UpdatePodcastInput): Promise<CoreOutput>;
    getEpisodes(podcastId: number): Promise<EpisodesOutput>;
    getEpisode({ podcastId, episodeId, }: EpisodesSearchInput): Promise<GetEpisodeOutput>;
    createEpisode({ podcastId, title, category, }: CreateEpisodeInput): Promise<CreateEpisodeOutput>;
    deleteEpisode({ podcastId, episodeId, }: EpisodesSearchInput): Promise<CoreOutput>;
    updateEpisode({ podcastId, episodeId, ...rest }: UpdateEpisodeInput): Promise<CoreOutput>;
}
