import { useContext } from 'react';
import { FirebaseProviderContext } from './FirebaseProviderContext';
import { FirebaseProviderContextType } from './types';

export const useFirebase = (): FirebaseProviderContextType => {
  return useContext(FirebaseProviderContext);
};
