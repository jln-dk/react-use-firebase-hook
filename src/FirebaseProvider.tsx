import React, { useEffect, useReducer } from 'react';
import { FirebaseProviderContext } from './FirebaseProviderContext';
import { initialState, reducer } from './reducer';
import { FirebaseProviderProps } from './types';
import * as firebaseApp from 'firebase/app';
import 'firebase/auth';

export const FirebaseProvider = (props: FirebaseProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Initialize Firebase app on mount and config changes
    const firebase = firebaseApp.initializeApp(props.config);
    dispatch({ type: 'FIREBASE_LOADED', payload: firebase });
  }, [props.config]);

  useEffect(() => {
    // Check if Firebase instance is valid
    if (!state.firebase) {
      return;
    }

    // Subscribe to user auth changes
    const unsubscribe = firebaseApp.auth().onAuthStateChanged(user => {
      dispatch({
        type: 'USER_CHANGE',
        payload: user,
      });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [state.firebase]);

  // If Firebase isn't ready return null
  if (!state.firebase) {
    return null;
  }

  return (
    <FirebaseProviderContext.Provider
      value={{
        firebase: state.firebase,
        user: state.user,
        loading: state.loading,
      }}
    >
      {props.children}
    </FirebaseProviderContext.Provider>
  );
};
