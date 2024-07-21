import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Button, ImageBackground } from 'react-native';

const Separator = () => <View style={styles.separator} />;

const UpdateMovieScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const [movie, setMovie] = useState([]);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDirector, setUpdatedDirector] = useState('');
  const [updatedYear, setUpdatedYear] = useState('');

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      const response = await fetch(`https://dwa-crud-api-6cbd428f9d7d.herokuapp.com/api/v1/movies/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovie(data);
      setUpdatedTitle(data.title);
      setUpdatedDirector(data.director);
      setUpdatedYear(data.year.toString());
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };


  const updateMovie = async () => {
    try {
      const response = await fetch(`https://dwa-crud-api-6cbd428f9d7d.herokuapp.com/api/v1/movies/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedTitle,
          director: updatedDirector,
          year: parseInt(updatedYear),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update movie');
      }
      navigation.navigate('Home', { refresh: true });
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../images/movies.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={updatedTitle}
        onChangeText={setUpdatedTitle}
      />
      <Text style={styles.label}>Director</Text>
      <TextInput
        style={styles.input}
        value={updatedDirector}
        onChangeText={setUpdatedDirector}
      />
      <Text style={styles.label}>Year</Text>
      <TextInput
        style={styles.input}
        value={updatedYear}
        onChangeText={setUpdatedYear}
        keyboardType="numeric"
      />
        <Separator />
        <Button title='Update Movie' onPress={updateMovie} color= "red" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
    backgroundColor: 'white',
    opacity: 0.8,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default UpdateMovieScreen;