import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    profileId: string | null;
  };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
const APP_URL = process.env.EXPO_PUBLIC_API_URL;
console.log(APP_URL);

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    profileId: string | null;
  }>({
    token: null,
    authenticated: null,
    profileId: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const profileId = await SecureStore.getItemAsync("profileId");
      console.log("stored:", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
          profileId: profileId,
        });

        console.log("LoggedIn JWT used 🔐");
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)");
      }
    };
    loadToken();
  }, []);

  const register = async (email: string, password: string) => {
    console.log("user registring...");
    try {
      return await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/user/register`,
        {
          emailAddress: email,
          password,
        },
        {
          headers: {
            ContentType: "application/json",
          },
        }
      );
    } catch (error) {
      return error;
    }
  };
  const login = async (email: string, password: string) => {
    try {
      console.log("logining....");
      const result = await axios.post(
        `${APP_URL}/user/login`,
        { emailAddress: email, password },
        {
          headers: {
            ContentType: "application/json",
          },
        }
      );

      setAuthState({
        token: result.data.token,
        authenticated: true,
        profileId: result.data.userId,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      await SecureStore.setItemAsync("profileId", result.data.userId);
      router.replace("/(tabs)");
      return result;
    } catch (error) {
      return error;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
      profileId: null,
    });
    console.log("Logout....");
    router.replace("/(auth)");
  };
  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
