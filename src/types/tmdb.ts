export interface Rating {
  voteCount: number;
  avgRating: number;
}
export interface Episode {
  id: string;
  episode_number: number;
  season: string;
  title: string;
  rating: Rating;
}

export interface Season {
  season: string;
  episode_count: number;
  episodes?: Episode[];
}

export interface Show {
  id: string;
  title: string;
  seasons: Season[];
  number_of_seasons?: number;
  posterUrl?: string;
}

export interface SearchShow {
  id: string,
  title: string,
  posterUrl?: string,
  rating?: number,

}