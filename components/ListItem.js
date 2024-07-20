import { StyleSheet, Text, View } from 'react-native'

export default function ListItem({children}) {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>{children}</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      padding: 5,
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 8,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    text: {
      fontSize: 30,
      color: 'white',
      backgroundColor: 'black',
      padding: 20,
      textAlign: "center",
    },
})