import { Show, Episode, Season, Rating } from '../types/tmdb';

export function fromApiShow(apiShow: any): Show {
    return {
        id: apiShow.id,
        title: apiShow.primaryTitle,
        number_of_seasons: undefined,
        seasons: []
    };
}

export function fromApiSeason(apiSeason: any): Season {
    return {
        season: apiSeason.season,
        episode_count: apiSeason.episodeCount,
        episodes: []
    };
}

export function fromApiEpisode(apiEpisode: any): Episode {
    return {
        id: apiEpisode.id,
        episode_number: apiEpisode.episodeNumber,
        season: apiEpisode.season,
        title: apiEpisode.title,
        rating: fromApiRating(apiEpisode.rating),
    };
}

export function fromApiRating(apiRating: any): Rating {
    return {
        voteCount: apiRating.voteCount,
        avgRating: apiRating.aggregateRating,
    }
}

