import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';


export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    //Her skal koden skrives, som du vil have som en 'side-effect'
    // det kan være manuelle DOM-maniulationer
    console.log("The count is:", count);

    // der er en usynlig OPTIONAL return.
    return () => {
      console.log("I am being cleaned up!");
      
    }
  },[count]); // [] = inde i disse er det som useEffecten skal lytte og reagere på

  // OBS: med return ser det således ud i loggen:

  // LOG: The count is: 0          - Kører altid når komponenten bliver 'mountet'

  // LOG: I am being cleaned up!   - Kommer med 1. tryk
  // LOG: The count is: 1          - Kommer med 1. tryk

  // LOG: I am being cleaned up! 
  // LOG: The count is: 2
  
  // LOG: I am being cleaned up!   - Kommer med 3. tryk
  // LOG: The count is: 3          - Kommer med 3. tryk


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


