import * as React from 'react';
import { StyleSheet, Text, Pressable, SafeAreaView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { decrement, increment } from './counterSlice';

export function CounterScreen() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Count: {count}</Text>

      <Pressable
        accessibilityRole="button"
        onPress={() => dispatch(increment())}
      >
        <Text>Increment</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={() => dispatch(decrement())}
      >
        <Text>Decrement</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    marginTop: 8,
    marginBottom: 40,
  },
});
