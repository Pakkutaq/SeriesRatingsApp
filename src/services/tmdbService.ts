import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../utils/constants';
import { fromApiShow, fromApiSeason } from '../models/showMapper';
import { Show } from '../types/tmdb';

// Search for TV shows
export const searchShows = async (query: string) => {
  // TODO
};

// Get show details
export const getShowDetails = async (showId: number): Show => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/tv/${showId}`, {
      params: { api_key: TMDB_API_KEY }
    });
    return fromApiShow(response.data);
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

// Get season details with episodes
export const getSeasonDetails = async (showId: number, seasonNumber: number) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/tv/${showId}/season/${seasonNumber}`, {
        params: {api_key: TMDB_API_KEY}
    });
    return fromApiSeason(response.data);
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};