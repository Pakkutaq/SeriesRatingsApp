import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, BackHandler, TextInput } from 'react-native';
import { getShowDetails, getSeasons, searchShows } from '../services/tmdbService';
import type { Show, SearchShow } from '../types/tmdb'
import { ShowCard, SearchShowCard } from '../components/index'
import { isDisabled } from 'react-native/types_generated/Libraries/LogBox/Data/LogBoxData';

export default function App() {
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(false);
  const [searches, setSearch] = useState<SearchShow[] | null>(null);
  const [searchQuery, onQueryChange] = useState('');
  
  // Handle Android back button
  useEffect(() => {
    const backAction = () => {
      if (show || searches) {
        // If we have a show or searches, go back to home
        setShow(null);
        setSearch(null);
        onQueryChange('');  // Clear search query
        return true;  // Prevent default behavior (exiting app)
      }
      return false;  // Let default behavior happen (exit app)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();  // Cleanup
  }, [show, searches]);
  
  const getShowDetailsAsync = async (showId: string, showTitle: string) => {
    onQueryChange(showTitle);  // Set search query to clicked show's title
    setSearch(null);  // Clear searches
    setLoading(true);
    try {
      const showResult: Show = await getShowDetails(showId);
      const seasons = await getSeasons(showResult.id);
      setShow({ ...showResult, seasons });
    } finally {
      setLoading(false);
    }
  };

  const searchForShow = async (query: string) => {
    setShow(null);
    try {
      const searchResult: SearchShow[] = await searchShows(query);
      setSearch(searchResult.sort((a, b) => {
        if (a.rating === undefined) return 1;
        if (b.rating === undefined) return -1;
        return b.rating - a.rating;
      }).slice(0,5));
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        {!show && (
        <>
          <TextInput 
            style={styles.input}
            onChangeText={onQueryChange}
            value={searchQuery}
            placeholder='Search for a show'
            placeholderTextColor='#888'
          />
          <Button title="Search for show" onPress={() => searchForShow(searchQuery)} disabled={loading}/>
        </>
        )}
        {loading ? (
          <ActivityIndicator size="large" color="#0dbfe7ff" style={styles.spinner} />
        ) : searches ? (
          <SearchShowCard 
            shows={searches}
            onShowPress={(showId, showTitle) => {
              console.log('Clicked show:', showId);
              getShowDetailsAsync(showId, showTitle);
            }}
          />
        ) : show ? (
          <ShowCard show={show} />
        ) : (
          <Text style={styles.text}>Ingen shows fundet</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    height: 40,
    minWidth: 300,
    margin: 12,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: 10,
  },
});