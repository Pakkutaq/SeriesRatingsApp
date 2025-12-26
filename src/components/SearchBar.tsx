import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  placeholder?: string;
  size?: 'small' | 'large';
}

export default function SearchBar({ 
  value, 
  onChangeText, 
  onSearch, 
  placeholder = 'Search for a show...',
  size = 'large' 
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, size === 'small' ? styles.inputSmall : styles.inputLarge]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor='#888'
        onSubmitEditing={onSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: 10,
    borderRadius: 8,
  },
  inputSmall: {
    height: 35,
    width: '100%',
    fontSize: 14,
  },  
  inputLarge: {
    height: 50,
    width: '90%',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#0dbfe7ff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});