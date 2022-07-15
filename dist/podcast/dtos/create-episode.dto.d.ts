import { Episode } from '../entities/episode.entity';
import { CoreOutput } from './output.dto';
declare const CreateEpisodeInput_base: import("@nestjs/common").Type<Pick<Episode, "title" | "category">>;
export declare class CreateEpisodeInput extends CreateEpisodeInput_base {
    podcastId: number;
}
export declare class CreateEpisodeOutput extends CoreOutput {
    id?: number;
}
export {};
