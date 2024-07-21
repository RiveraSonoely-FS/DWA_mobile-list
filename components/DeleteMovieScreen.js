import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, ImageBackground } from 'react-native';

const Separator = () => <View style={styles.separator} />;

const DeleteMovieScreen = ({ navigation, route }) => {
  const { id, title } = route.params;
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const deleteMovie = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://dwa-crud-api-6cbd428f9d7d.herokuapp.com/api/v1/movies/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
      navigation.navigate('Home');
    } catch (error) {
      setError(error.message || 'Unexpected Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../images/movies.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.text}>Delete Movie</Text>
        <Separator />
        <Text style={styles.movieTitle}>{title}</Text>
        <Separator />
        <View style={styles.buttonContainer}>
          <Button title='Delete' onPress={deleteMovie} color="red" disabled={loading} />
          <Separator />
          <Button title='Cancel' onPress={() => navigation.goBack()} color="blue" />

        </View>
        {loading && <Text style={styles.loadingText}>Deleting...</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFF',
    marginBottom: 20,
  },
  movieTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFF',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFF',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
  separator: {
    marginHorizontal: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default DeleteMovieScreen;
