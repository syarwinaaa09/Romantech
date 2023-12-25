import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  const [_request, _loginResult, promptGoogle] = Google.useAuthRequest({
    androidClientId: '1050005367404-42jrskd56ibdk37h2j48m3dkb8a40vl4.apps.googleusercontent.com',
    iosClientId: '1050005367404-2pc4gsbvgitc7v8jjd9c6eva2draisd1.apps.googleusercontent.com',
    expoClientId: '1050005367404-rp4ifm8rvrjs9uutfcjm62abefqggm1l.apps.googleusercontent.com',
    scopes: ["profile", "email", "openid"],
    responseType: "id_token",
  });

  const logout = () => {
    setLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const signInWithGoogle = () => {
    setLoading(true);
    promptGoogle()
      .then((loginResult) => {
        if (loginResult?.type === "success") {
          const idToken = loginResult.params.id_token;
          const credential = GoogleAuthProvider.credential(idToken);
          signInWithCredential(auth, credential).then(() => {
            console.log("Logged in");
          });
        } else {
          throw new Error("Google login failed");
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoadingInitial(false);
    });

    return unsub;
  }, []);

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}