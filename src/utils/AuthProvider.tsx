import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

interface User {
  name: string;
  email: string;
  role: string;
  user_id: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  localSave: (data: any) => void;
  logout: () => void;
  login: () => void;
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
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const loadStoredData = () => {
    const storedToken = localStorage.getItem('token');
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    const storedRole = localStorage.getItem('role');
    const storedUserId = localStorage.getItem('user_id');

    console.log('Stored data:', { storedToken, storedName, storedEmail, storedRole, storedUserId });

    if (storedToken && storedName && storedEmail && storedRole && storedUserId) {
      setToken(storedToken);
      setUser({ name: storedName, email: storedEmail, role: storedRole, user_id: storedUserId });
      setIsAuthenticated(checkAuthenticated(storedToken));
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); 
  };

  const localSave = (data: any) => {
    console.log('Saving data:', data);
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);
    localStorage.setItem('email', data.email);
    localStorage.setItem('role', data.role);
    localStorage.setItem('user_id', data.user_id);
    setToken(data.token);
    setUser({ name: data.name, email: data.email, role: data.role, user_id: data.user_id });
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const login = () => {
    navigate('/login');
  };

  const checkAuthenticated = (tokenToCheck?: string) => {
    try {
      const currentToken = tokenToCheck || token;
      console.log(currentToken);
      if (!currentToken) {
        console.log('No token found');
        return false; 
      }

      const { exp } = jwtDecode<{ exp: number }>(currentToken);
      const expInMilliseconds = exp * 1000;
      const currentTime = Date.now();
      console.log('Token expiration time:', new Date(expInMilliseconds).toLocaleString());
      console.log('Current time:', new Date(currentTime).toLocaleString());
      return expInMilliseconds > currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  };

  useEffect(() => {
    loadStoredData();
  }, []);

  if (loading) {
    return <div className="px-12 sm:ml-64 mt-20">
    {loading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <HashLoader color="#36d7b7" size={50} />
      </div>
    )}
  </div>; 
  }

  return (
    <AuthContext.Provider value={{ token, user, localSave, logout, checkAuthenticated, login }}>
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
