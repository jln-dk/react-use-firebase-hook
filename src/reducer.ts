import { Action, InternalState } from './types';

export const initialState: InternalState = {
  loading: true,
  firebase: null,
  user: null,
};

export const reducer = (
  state: InternalState,
  action: Action
): InternalState => {
  switch (action.type) {
    case 'FIREBASE_LOADED':
      return {
        ...state,
        firebase: action.payload,
      };
    case 'USER_CHANGE':
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    default:
      throw new Error('Invalid action');
  }
};
