import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('access', token);
  } catch (error) {
    console.error('Erro ao salvar token:', error);
  }
};
