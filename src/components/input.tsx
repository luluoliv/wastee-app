// src/components/Input.tsx
import React from 'react';
import { TextInput, StyleSheet, Text, View, ViewStyle, TextStyle, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  required?: boolean
}

const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  containerStyle,
  labelStyle,
  errorStyle,
  required,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
    {label && (
      <Text style={[styles.label, labelStyle]}>
        {label}
        {required && <Text style={styles.requiredIndicator}>*</Text>}
      </Text>
    )}
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
    color: "#FFFFF",
  },
  input: {
    color: "#FFFFF",
    height: 40,
    borderColor: '#787F8D',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 26,
  },
  requiredIndicator: {
    color: 'red',
    fontSize: 16,
    marginLeft: 4,
  },
  error: {
    color: 'red',
    marginTop: 4,
  },
});

export default Input;
