import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import apiService from '../service/apiService';
import { useUser } from '@/src/contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

interface AuthContextType {
    token: string | null;
    isLoading: boolean;
    refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado com o AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { setUser } = useUser();
    const navigation = useNavigation();

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken) {
                    setToken(storedToken);
                }
            } catch (error) {
                console.error('Falhou ao carregar token', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadToken();
    }, []);

    const handleUnauthorized = () => {
        Alert.alert('Sessão expirada', 'Você foi deslogado por inatividade. Por favor, entre novamente.');
        setToken(null);
        setUser(null);
        AsyncStorage.removeItem('token');
        navigation.navigate('/login');
    };

    const refreshToken = async () => {
        if (!token) return; // Do nothing if there's no token
        try {
            const response = await apiService.post('/token/refresh', { token });
            const { newToken } = response.data;
            setToken(newToken);
            await AsyncStorage.setItem('token', newToken);
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                handleUnauthorized();
            } else {
                Alert.alert('Error', 'Falhou ao renovar token. Por favor, entre novamente.');
            }
        }
    };

    const value: AuthContextType = {
        token,
        isLoading,
        refreshToken,
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};
