import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Show } from '../types/tmdb';
import ShowCard from './ShowCard';

interface SeriesDetailProps {
  show: Show;
}

export default function SeriesDetail({ show }: SeriesDetailProps) {
  return (
    <View style={styles.container}>
      <ShowCard show={show} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});