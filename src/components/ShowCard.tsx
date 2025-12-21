import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Show, Season } from '../types/tmdb';
import SeasonCard from './SeasonCard';

interface ShowCardProps {
  show: Show;
}

export default function ShowCard({ show }: ShowCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{show.title}</Text>
      <FlatList
        data={show.seasons}
        keyExtractor={( season: Season ) => season.season}
        renderItem={({ item }: { item: Season }) => (
          <SeasonCard season={item}/>
        )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 5,
  },
});