import axios from 'axios';
import { IMDB_BASE_URL } from '../utils/constants';
import { fromApiShow, fromApiSeason, fromApiEpisode } from '../models/showMapper';
import { Show, Season, Episode } from '../types/tmdb';

// Search for TV shows
export const searchShows = async (query: string) => {
  // TODO
};

// Get show details
export const getShowDetails = async (showId: string): Promise<Show> => {
  try {
    const response = await axios.get(`${IMDB_BASE_URL}/titles/${showId}`)
    return fromApiShow(response.data);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getSeasons = async (showId: string): Promise<Season[]> => {
  try {
    const response = await axios.get<any>(`${IMDB_BASE_URL}/titles/${showId}/seasons`);
    const seasons: Season[] = response.data.seasons.map((season: any) => fromApiSeason(season));
    
    // Fetch episodes for each season
    const seasonsWithEpisodes = [];
    for (const season of seasons) {
      const episodes = await getEpisodes(showId, season.season);
      seasonsWithEpisodes.push({ ...season, episodes });
      
      // Wait 1 second between requests to respect rate limits
      await new Promise(resolve => setTimeout(() => resolve(undefined), 100));
    }
    return seasonsWithEpisodes;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const getEpisodes = async (showId: string, season: string): Promise<Episode[]> => {
  try {
    const response = await axios.get<any>(`${IMDB_BASE_URL}/titles/${showId}/episodes`, {
      params: {
        season: season
      }
    });
    return response.data.episodes.map((episode: any) => fromApiEpisode(episode));
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
}