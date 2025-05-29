import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useState } from 'react';

// viser useState, som er en midlertidig opdatering af data 
// der bliver manipuleret i frontend.

//Altså: useState er en hook,  
// Der manipulere state.

export default function App() {
  const [count, setCount] = useState(0);
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Count: {count}</Text>

      <Pressable style={styles.button}
        onPress={() => setCount(count + 1)}>
          <Text>Increment</Text>
      </Pressable>
      
      <Pressable style={styles.button}
        onPress={() => setCount(count - 1)}>
          <Text>Decrement</Text>
      </Pressable>

    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    marginTop: 25,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 14,
    borderColor: 'black',
  }

});


