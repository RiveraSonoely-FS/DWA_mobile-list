import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, Button } from 'react-native';

const Separator = () => <View style={styles.separator} />;

const MovieDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovie();
  }, []);

  const handleUpdatePress = () => {
    navigation.navigate('UpdateMovie', { id });
  };

  const handleDeletePress = () => {
    navigation.navigate('DeleteMovie', { id });
  };

  const fetchMovie = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://dwa-crud-api-6cbd428f9d7d.herokuapp.com/api/v1/movies/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      setError(error.message || 'Unexpected Error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../images/movies.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {movie ? (
            <>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.text}>{movie.director}</Text>
                <Text style={styles.text}>{movie.year}</Text>
                <Separator />
                <Button title="Update Movie" onPress={handleUpdatePress} color= "red" />
                <Separator />
                <Button title="Delete Movie" onPress={handleDeletePress} color= "red" />
            </>
            ) : (
                <Text>Loading...</Text>
        )}
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
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFF',
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    color: '#FFFF',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFF',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default MovieDetailsScreen;
