import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Season, Episode } from '../types/tmdb';

interface SeasonCardProps {
  season: Season;
}

export default function SeasonCard({ season }: SeasonCardProps) {
  const getRatingColor = (rating: number) => {
    if (rating >= 9.9) return '#0dbfe7ff'; // light blue
    if (rating >= 8.5) return '#4ade80'; // green - awesome
    if (rating >= 7.5) return '#22c55e'; // lighter green - great
    if (rating >= 6.5) return '#fbbf24'; // yellow - good
    if (rating >= 5.0) return '#fb923c'; // orange - average
    return '#ef4444'; // red - bad
  };

  return (
    <View style={styles.seasonCard}>
      <Text style={styles.seasonTitle}>Season {season.season}</Text>
      <View style={styles.episodesContainer}>
        {season.episodes?.map((episode: Episode) => (
          <View 
            key={episode.id} 
            style={[
              styles.episodeCard, 
              { backgroundColor: getRatingColor(episode.rating.avgRating) }
            ]}
          >
            <Text style={styles.episodeNumber}>E{episode.episode_number}</Text>
            <Text style={styles.rating}>{episode.rating.avgRating}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  seasonCard: {
  backgroundColor: '#2a2a2a',
  padding: 15,
  marginHorizontal: 10,
  marginVertical: 5,
  width: '95%',
},
  seasonTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  episodesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  episodeCard: {
    padding: 10,
    margin: 5,
    minWidth: 70,
    borderRadius: 5,
    alignItems: 'center',
  },
  episodeNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
});