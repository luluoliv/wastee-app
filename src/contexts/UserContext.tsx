// UserContext.tsx
import React, { createContext, useContext, useState } from "react";

export interface User {
    id: string;
    email: string;
    name: string;
    is_active: boolean;
    is_staff: boolean;
    user_type: string;
    created_at: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser deve ser usado com o UserProvider");
    }
    return context;
};
