import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  email:string,
  password:string
}

interface AuthContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User; 
  login: (credentials: User) => Promise<void>; 
  logout: () => void;
  redirectAfterLogin?: string; // Optional redirect URL for after login
  setRedirectAfterLogin?: (url: string) => void; // Optional function to set redirect URL
}

const useAuth = (): AuthContext => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | undefined>("http://localhost:5173");
  const [redirectOnFail, setRedirectOnFail] = useState<string | undefined>("http://localhost:5173/notfound")

  useEffect(() => {
    const checkAuth = async () => {
      try {
        
        const token = localStorage.getItem('jwtToken');

        if (token) {
          
          try {
            const response = await axios.get<any>('/api/auth/validate', {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.isValid) {
              setIsAuthenticated(true);
              setUser(response.data.user); // If validation response includes user data
            } else {
              // Handle invalid token (e.g., remove token, redirect to login)
              localStorage.removeItem('jwtToken');
            }
          } catch (error) {
            console.error('Error validating token:', error);
            // Handle validation errors (e.g., redirect to login)
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: User) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/signin', credentials);
      const token = response.data.token; // Assuming response structure

      localStorage.setItem('jwtToken', token);
      setIsAuthenticated(true);
      
        
      // Handle successful login and redirect (if applicable)
    if (redirectAfterLogin) {
      window.location.href = redirectAfterLogin;
      setRedirectAfterLogin(undefined); // Clear redirect URL after use
    }
    } catch (error) {
     
      console.error('Sign in failed:', error);
    // Handle login errors (e.g., display error message)

    if (redirectOnFail) {
      window.location.href = redirectOnFail;
      setRedirectOnFail(undefined); // Clear redirect URL after use
    }
      // Handle login errors (e.g., display error message)
    }
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
    setUser(undefined);
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    redirectAfterLogin,
    setRedirectAfterLogin,
  };
};

export default useAuth;
