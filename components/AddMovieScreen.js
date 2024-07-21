import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, ImageBackground } from 'react-native';

const Separator = () => <View style={styles.separator} />;

const AddMovieScreen = ({ navigation }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    director: '',
    year: '',
  });

  const handleChange = (name, value) => {
    setNewMovie({
      ...newMovie,
      [name]: value,
    });
  };

  const addMovie = async () => {
    try {
      const response = await fetch('https://dwa-crud-api-6cbd428f9d7d.herokuapp.com/api/v1/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      });
      if (!response.ok) {
        throw new Error('Failed to add movie');
      }
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../images/movies.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
      <TextInput
          style={styles.input}
          value={newMovie.title}
          onChangeText={(text) => handleChange('title', text)}
          placeholder="Enter movie title"
        />
        <TextInput
          style={styles.input}
          value={newMovie.director}
          onChangeText={(text) => handleChange('director', text)}
          placeholder="Enter director"
        />
        <TextInput
          style={styles.input}
          value={newMovie.year}
          onChangeText={(text) => handleChange('year', text)}
          placeholder="Enter year"
          keyboardType="numeric"
        />
        <Separator />
        <Button title='Add Movie' onPress={addMovie} color = "red" />
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
    borderColor: 'black',
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

export default AddMovieScreen;