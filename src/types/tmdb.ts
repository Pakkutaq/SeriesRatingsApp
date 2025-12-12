export interface Episode {
  id: number;
  episode_number: number;
  season_number: number;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface Season {
  season_number: number;
  episode_count: number;
  episodes?: Episode[];
}

export interface Show {
  id: number;
  name: string;
  poster_path: string;
  seasons: Season[];
  number_of_seasons: number;
}