import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SearchShow } from '../types/tmdb';

interface ShowCardProps {
  shows: SearchShow[];
  onShowPress: (showId: string, showTitle: string) => void;  // Updated to include title
}

export default function SearchShowCard({ shows, onShowPress }: ShowCardProps) {
  return (
    <View style={styles.card}>
      <FlatList
        data={shows}
        keyExtractor={(show: SearchShow) => show.id}
        renderItem={({ item }: {item: SearchShow}) => (
          <TouchableOpacity 
            style={styles.showItem}
            onPress={() => onShowPress(item.id, item.title)}  // Pass both id and title
          >
            <Text style={styles.info}>{item.title}</Text>
            {item.rating && (
              <Text style={styles.rating}>★ {item.rating.toFixed(1)}</Text>
            )}
          </TouchableOpacity>
        )}/>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
  },
  showItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    color: '#fff',
    fontSize: 18,
    marginTop: 5,
  },
  rating: {
    color: '#fbbf24',
    fontSize: 14,
    marginTop: 3,
  },
});