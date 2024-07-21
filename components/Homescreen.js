import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ImageBackground, Text, View, Button, FlatList, TouchableOpacity, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

const Separator = () => <View style={styles.separator} />;

const HomeScreen = ({ route, navigation }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://dwa-crud-api-6cbd428f9d7d.herokuapp.com/api/v1/movies');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMovies();
    }, [])
  );

  const navigateToMovieDetails = (id) => {
    navigation.navigate('MovieDetails', { id });
  };

  return (
    <ImageBackground
      source={require('../images/movies.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.text}>All Movies</Text>
        <Button
          title='Add Movie'
          onPress={() => navigation.navigate('AddMovie', { fetchMovies })}
          color = "red"
        />
        <Separator />

        <FlatList
          data={movies}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToMovieDetails(item._id)}>
              <View style={styles.movie}>
                <Text style={styles.movieText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FFFF',
    marginTop: '30%',
    marginBottom: '10%',
  },
  movie: {
    backgroundColor: 'black',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: 'yellow',
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default HomeScreen;
