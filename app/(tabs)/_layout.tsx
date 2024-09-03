import React from 'react';
import { Tabs } from 'expo-router';
import { Home, ThumbsUp, Plus, MessageCircle, User } from 'lucide-react';

export default function Navbar() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: 'black',
                    borderTopWidth: 0,
                },
                tabBarLabelStyle: {
                    display: 'none', // Hide the labels
                },
                tabBarIcon: ({ color, focused }) => {
                    const iconProps = { size: 28, color: focused ? 'white' : color };

                    switch (route.name) {
                        case 'home':
                            return <Home {...iconProps} />;
                        case 'liked':
                            return <ThumbsUp {...iconProps} />;
                        case 'add':
                            return <Plus {...iconProps} />;
                        case 'messages':
                            return <MessageCircle {...iconProps} />;
                        case 'perfil':
                            return <User {...iconProps} />;
                        default:
                            return null;
                    }
                },
            })}
        >
            <Tabs.Screen name="home" />
            <Tabs.Screen name="liked" />
            <Tabs.Screen name="add" />
            <Tabs.Screen name="messages" />
            <Tabs.Screen name="perfil" />
        </Tabs>
    );
}
