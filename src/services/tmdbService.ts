import axios from 'axios';
import { IMDB_BASE_URL } from '../utils/constants';
import { fromApiShow, fromApiSeason, fromApiEpisode, fromApiSearchShow } from '../models/showMapper';
import { Show, Season, Episode, SearchShow } from '../types/tmdb';

// Search for TV shows
export const searchShows = async (query: string): Promise<SearchShow[]> => {
  try {
    const response = await axios.get(`${IMDB_BASE_URL}/search/titles`, {
      params: {
        query: query
      }
    });
    console.log(response.status)
    // For now we should not allow moves, only type: tvSeries
    const filteredShows = response.data.titles.filter((item: any) => {
      return item.type === 'tvSeries' && item.rating !== undefined
    })
    return filteredShows.map((show: any) => fromApiSearchShow(show));
  } catch (error) {
    console.error('Error searching shows:', error);
    throw error;
  }
};

// Get show details
export const getShowDetails = async (showId: string): Promise<Show> => {
  try {
    const response = await axios.get(`${IMDB_BASE_URL}/titles/${showId}`)
    return fromApiShow(response.data);
  } catch (error) {
    console.error('Error fetching show details:', error);
    throw error;
  }
};3

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
      await new Promise(resolve => setTimeout(() => resolve(undefined), 500));
    }
    return seasonsWithEpisodes;
  } catch (error) {
    console.error('Error fetching season:', error);
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