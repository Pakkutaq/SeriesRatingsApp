import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getShowDetails } from '../services/tmdbService';
import ShowCard from '../components/ShowCard';

export default function App() {

  const [show, setShow] = useState<Show | null>(null);


  const getShowDetailsAsync = async (showId: number) => {
    const showResult: Show = await getShowDetails(showId);
    setShow(showResult);
  };

  return (
    <View style={styles.container}>
      <Button title="Get Show Details" onPress={() => getShowDetailsAsync(1399)} />
        {show ? <ShowCard show={show} /> : <Text>No show loaded</Text>}
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
});