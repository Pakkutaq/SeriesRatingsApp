import { Show, Episode, Season } from '../types/tmdb';

export function fromApiShow(apiShow: any): Show {
    return {
        id: apiShow.id,
        name: apiShow.name,
        poster_path: apiShow.poster_path,
        number_of_seasons: apiShow.number_of_seasons,
        seasons: []
    };
}

export function fromApiSeason(apiSeason: any): Season {
    return {
        season_number: apiSeason.season_number,
        episode_count: apiSeason.episode_count,
        episodes: []
    };
}

export function fromApiEpisode(apiEpisode: any): Episode {
    return {
        id: apiEpisode.id,
        episode_number: apiEpisode.episode_number,
        season_number: apiEpisode.season_number,
        name: apiEpisode.name,
        vote_average: apiEpisode.vote_average,
        vote_count: apiEpisode.vote_count
    };
}