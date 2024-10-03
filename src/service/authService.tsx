import apiService from './apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '../utils/setToken';

interface LoginResponse {
  access: string;
  refresh?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = async (credentials: LoginCredentials): Promise<void> => {
  try {
    const response = await apiService.post<LoginResponse>('login/', credentials);

    const { access, refresh } = response.data;

    await setToken(access);

    if (refresh) {
      await AsyncStorage.setItem('refreshToken', refresh);
    }

    console.log('Login feito com sucesso, token salvo');
  } catch (error) {
    console.error('Login falhou:', error);
    throw new Error('Falhou ao logar. Por favor, cheque suas credenciais.');
  }
};
