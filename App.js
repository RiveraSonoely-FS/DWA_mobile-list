import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, Text, View } from 'react-native';
import ListContainer from './components/ListContainer'

export default function App() {
  
  fetch(`https://dwa-crud-api-6cbd428f9d7d.herokuapp.com`)
  .then(res => res.json())
  .then(data => console.log({data}))
  return (
    <ImageBackground
      source={require('./images/movies.jpeg')} // Adjust the path as per your actual image location
      style={styles.background}
      resizeMode="cover"
    >
    <View style={styles.container}>
      <Text style={styles.text}>Movies</Text>
      <ListContainer />
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
    paddingHorizontal: 20
  },
  text: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: '30%',
    marginBottom: '10%'
  }
});
