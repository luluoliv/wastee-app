// src/components/Input.tsx
import React from 'react';
import { TextInput, StyleSheet, Text, View, ViewStyle, TextStyle, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  containerStyle,
  labelStyle,
  errorStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput style={styles.input} {...props} />
      {errorMessage && <Text style={[styles.error, errorStyle]}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    color: "#fff",
    height: 40,
    borderColor: '#787F8D',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 26,
  },
  error: {
    color: 'red',
    marginTop: 4,
  },
});

export default Input;
