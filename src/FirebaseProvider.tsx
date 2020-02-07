import React, { useEffect, useState } from 'react';
import { FirebaseProviderContext } from './FirebaseProviderContext';
import { FirebaseProviderProps } from './types';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export const FirebaseProvider = (props: FirebaseProviderProps) => {
  const [loaded, setLoaded] = useState(false);
  const [
    firebaseInstance,
    setFirebaseInstance,
  ] = useState<firebase.app.App | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    // Initialize Firebase app on mount and config changes
    const app = firebase.initializeApp(props.config);
    setFirebaseInstance(app);
  }, [props.config]);

  useEffect(() => {
    // Check if Firebase instance is valid
    if (!firebaseInstance) {
      return;
    }

    // Subscribe to user auth changes
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!loaded) {
        setLoaded(true);
      }
      setFirebaseUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [firebaseInstance, loaded]);

  // Check if provider has loaded and Firebase instance is valid
  if (!loaded || !firebaseInstance) {
    // Show either fallback or null
    return props.fallback || null;
  }

  return (
    <FirebaseProviderContext.Provider
      value={{ firebase: firebaseInstance, user: firebaseUser }}
    >
      {props.children}
    </FirebaseProviderContext.Provider>
  );
};
