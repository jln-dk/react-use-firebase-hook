import { useContext } from 'react';
import { FirebaseProviderContext } from './FirebaseProviderContext';
import { FirebaseHookReturnType } from './types';

export const useFirebase = (): FirebaseHookReturnType => {
  const { firebase, user } = useContext(FirebaseProviderContext);
  return [firebase, user];
};
