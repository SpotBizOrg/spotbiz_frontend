import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; 

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  localSave: (data: any) => void;
  logout: () => void;
  checkAuthenticated: () => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    const storedRole = localStorage.getItem('role');
    
    if (storedToken && storedName && storedEmail && storedRole) {
      setToken(storedToken);
      setUser({ name: storedName, email: storedEmail, role: storedRole });
      setIsAuthenticated(true);
    }
  }, []);

  const localSave = (data: any) => {
    console.log(data.token)
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);
    localStorage.setItem('email', data.email);
    localStorage.setItem('role', data.role);
    setUser(data);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login'); 
  };

  const checkAuthenticated = () => {
    console.log("He")
    if (!token) return false;
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      const expInMilliseconds = exp * 1000;
      const currentTime = Date.now();
      console.log('Token expiration time:', new Date(expInMilliseconds).toLocaleString());
      console.log('Current time:', new Date(currentTime).toLocaleString());
      return expInMilliseconds > currentTime;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, localSave, logout, checkAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
