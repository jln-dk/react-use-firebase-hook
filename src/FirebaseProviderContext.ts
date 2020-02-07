import { createContext } from 'react';
import { FirebaseProviderContextType } from './types';

export const FirebaseProviderContext = createContext<
  FirebaseProviderContextType
>({} as FirebaseProviderContextType);
