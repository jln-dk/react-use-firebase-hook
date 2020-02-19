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

export type FirebaseProviderProps = {
  config: FirebaseConfig;
  children?: JSX.Element;
};

export type FirebaseProviderContextType = {
  loading: boolean;
  firebase: firebase.app.App;
  user: firebase.User | null;
};

export type InternalState = {
  loading: boolean;
  firebase: firebase.app.App | null;
  user: firebase.User | null;
};

export type ActionFirebaseLoaded = {
  type: 'FIREBASE_LOADED';
  payload: firebase.app.App;
};

export type ActionUserChange = {
  type: 'USER_CHANGE';
  payload: firebase.User | null;
};

export type Action = ActionFirebaseLoaded | ActionUserChange;
