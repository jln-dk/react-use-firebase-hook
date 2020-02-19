# react-use-firebase-hook

**React hook for easy integration with Firebase.**

Finally an easy and clean way of integrating Firebase into your React web application using the React hooks pattern.  
Written in TypeScript.

## Install

```bash
# Yarn
yarn add react-use-firebase-hook

# NPM
npm install --save react-use-firebase-hook
```

## Quick Start

Wrap your application root with the `<FirebaseProvider>` component.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { FirebaseProvider, FirebaseConfig } from 'react-use-firebase-hook';

// Provide your Firebase config.
// Please remember to never commit your secret credentials!
const firebaseConfig: FirebaseConfig = {
  apiKey: 'some-api-key',
  authDomain: 'some-auth-domain',
  ...etc...
};

const App = () => {
  return (
    <FirebaseProvider config={firebaseConfig}>
      <MyApp />
    </FirebaseProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

Now you can use the `useFirebase()` hook in all of your components.  
Simple example:

```tsx
import React from 'react';
import { useFirebase } from 'react-use-firebase-hook';

const MyApp = () => {
  const { firebase, user, loading } = useFirebase();

  const onLoginClick = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword('email...', 'password...');
    } catch (error) {
      alert(error.message);
    }
  };

  const onLogoutClick = async () => {
    await firebase.auth().signOut();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <>Hey {user.email}, you are now logged in.</>
      ) : (
        <>You are not logged in.</>
      )}
      <button onClick={onLoginClick}>Log in</button>
      <button onClick={onLogoutClick}>Log out</button>
    </div>
  );
};
```

Please see the `./example/` folder for a more detailed example.

## Usage

_NOTE: React hooks require `react` and `react-dom` version `16.8.0` or higher._

### `<FirebaseProvider>`

Provider which initializes Firebase and provides it to the rest of your app (using React Context).

**config: `FirebaseConfig`**  
Firebase configuration. Required.

### `useFirebase()`

React hook for accessing the Firebase instance and current user.

**Return type:**

```tsx
{
  loading: boolean;
  firebase: firebase.app.App;
  user: firebase.User | null;
}
```

Usage:

```tsx
const { loading, firebase, user } = useFirebase();
```

## Contributing

Contributions are welcome.
