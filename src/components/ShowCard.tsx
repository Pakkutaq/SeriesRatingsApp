import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Show } from '../types/tmdb';

interface ShowCardProps {
  show: Show;
}

export default function ShowCard({ show }: ShowCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{show.name}</Text>
      <Text style={styles.info}>Number of seasons: {show.number_of_seasons}</Text>
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