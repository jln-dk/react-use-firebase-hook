import * as firebase from 'firebase';

export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

export type FirebaseProviderContextType = {
  firebase: firebase.app.App;
  user: firebase.User | null;
};

export type FirebaseProviderProps = {
  config: FirebaseConfig;
  children?: JSX.Element;
  fallback?: JSX.Element;
};

export type FirebaseHookReturnType = [firebase.app.App, firebase.User | null];
