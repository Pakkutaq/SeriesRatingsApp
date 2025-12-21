import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getShowDetails, getSeasons } from '../services/tmdbService';
import type { Show } from '../types/tmdb'
import ShowCard from '../components/ShowCard';

export default function App() {
  const [show, setShow] = useState<Show | null>(null);
  
  const getShowDetailsAsync = async (showId: string) => {
    const showResult: Show = await getShowDetails(showId);
    const seasons = await getSeasons(showResult.id);
    setShow({ ...showResult, seasons });
  };

  return (
    <View style={styles.container}>
      <Button title="Get Show Details" onPress={() => getShowDetailsAsync('tt0944947')} />
      {show ? <ShowCard show={show} /> : <Text style={styles.text}>No show loaded</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});