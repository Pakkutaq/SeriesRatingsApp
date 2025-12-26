import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, BackHandler, ScrollView } from 'react-native';
import { getShowDetails, getSeasons, searchShows } from '../services/tmdbService';
import type { Show, SearchShow } from '../types/tmdb';
import { SearchShowCard, SearchBar, SeriesDetail } from '../components/index';

export default function HomeScreen() {
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(false);
  const [searches, setSearch] = useState<SearchShow[] | null>(null);
  const [searchQuery, onQueryChange] = useState('');
  
  // Handle Android back button
  useEffect(() => {
    const backAction = () => {
      if (show || searches) {
        setShow(null);
        setSearch(null);
        onQueryChange('');
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [show, searches]);
  
  const getShowDetailsAsync = async (showId: string, showTitle: string) => {
    onQueryChange(showTitle);
    setSearch(null);
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
    if (!query.trim()) return;
    
    setShow(null);
    setLoading(true);
    try {
      const searchResult: SearchShow[] = await searchShows(query);
      setSearch(searchResult.sort((a, b) => {
        if (a.rating === undefined) return 1;
        if (b.rating === undefined) return -1;
        return b.rating - a.rating;
      }).slice(0, 5));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <View style={styles.container}>
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.topBar}>
        <Text style={styles.logo}>SERIES GRAPH</Text>
        <View style={styles.topSearchContainer}>
          <SearchBar 
            value={searchQuery}
            onChangeText={onQueryChange}
            onSearch={() => searchForShow(searchQuery)}
            size="small"
          />
        </View>
      </View>

      {show ? (
        // Show the series detail
        <SeriesDetail show={show} />
      ) : (
        // Home view with center search
        <View style={styles.centerContainer}>
          <View style={styles.mainSearchContainer}>
            <SearchBar 
              value={searchQuery}
              onChangeText={onQueryChange}
              onSearch={() => searchForShow(searchQuery)}
              size="large"
            />
          </View>

          {loading && (
            <ActivityIndicator size="large" color="#0dbfe7ff" style={styles.spinner} />
          )}

          {searches && !loading && (
            <SearchShowCard 
              shows={searches}
              onShowPress={(showId, showTitle) => {
                getShowDetailsAsync(showId, showTitle);
              }}
            />
          )}
        </View>
      )}
    </ScrollView>
  </View>
)}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginTop: 25,
  },
  logo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 15,
  },
  topSearchContainer: {
    flex: 1,
    maxWidth: 250,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  mainSearchContainer: {
    width: '100%',
    marginBottom: 20,
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
});