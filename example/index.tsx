import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FirebaseConfig, FirebaseProvider, useFirebase } from '../.';

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || '',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID || '',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || '',
};

const App = () => {
  return (
    <FirebaseProvider config={firebaseConfig} fallback={<div>Loading...</div>}>
      <Router />
    </FirebaseProvider>
  );
};

const Router = () => {
  const [, user] = useFirebase();
  if (!user) {
    return <LoginForm />;
  }
  return <PrivateRoute />;
};

const LoginForm = () => {
  const [firebase] = useFirebase();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onLoginClick = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Login with Firebase</h1>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={onLoginClick}>Log me in</button>
    </div>
  );
};

const PrivateRoute = () => {
  const [firebase, user] = useFirebase();

  const onLogoutClick = async () => {
    await firebase.auth().signOut();
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Hey {user.email}!</h1>
      <p>You are now logged in!</p>
      <button onClick={onLogoutClick}>Log out</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
