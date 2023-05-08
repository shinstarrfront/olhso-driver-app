//토큰 중앙 관리 
import React, { createContext, useContext, useState } from 'react';
import { Auth } from 'aws-amplify';

interface User {
  username: string;
  attributes: {
    email: string;
  };
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  accessToken: string | null;
  refreshToken: string | null;
  setRefreshToken: (token: string | null) => void;
  idToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setIdToken: React.Dispatch<React.SetStateAction<string | null>>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  accessToken: '',
  setAccessToken: () => {},
  refreshToken: null,
  setRefreshToken: () => {},
  idToken: '',
  setIdToken: () => {},
  signIn: async () => {},
  signOut: async () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  // const setAccessToken = (newAccessToken: string) => {
  //   setAccessTokenState(newAccessToken);
  // };

  // const setIdToken = (newIdToken: string) => {
  //   setIdTokenState(newIdToken);
  // };

  const signIn = async (email: string, password: string) => {
    try {
      const userData = await Auth.signIn(email, password);
      const { idToken, accessToken, refreshToken, signInUserSession } = userData;
      setUser(userData);
      setIdToken(idToken.jwtToken);
      setAccessToken(accessToken.jwtToken);
      setRefreshToken(refreshToken.token);
      setIdToken(signInUserSession.idToken.jwtToken);
    } catch (error) {
      console.log('Error signing in:', error);
      setUser(null);
      setIdToken(null);
      setAccessToken(null);
      setRefreshToken(null);
      setIdToken(null);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      setIdToken(null);
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        idToken,
        setIdToken,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export { AuthProvider, AuthContext };
