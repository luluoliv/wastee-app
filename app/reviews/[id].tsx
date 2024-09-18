import React from 'react'
import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router';

const Reviews = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>Reviews</Text>
    </View>
  )
}

export default Reviews