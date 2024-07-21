import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Homescreen';
import AddMovieScreen from './components/AddMovieScreen';
import UpdateMovieScreen from './components/UpdateMovieScreen';
import DeleteMovieScreen from './components/DeleteMovieScreen';
import MovieDetailsScreen from './components/MovieDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddMovie" component={AddMovieScreen} />
        <Stack.Screen name="UpdateMovie" component={UpdateMovieScreen} />
        <Stack.Screen name="DeleteMovie" component={DeleteMovieScreen} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
