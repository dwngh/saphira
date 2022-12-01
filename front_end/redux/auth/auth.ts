export interface AuthState {
    payload: {
      userId: number;
      accessToken: string;
      username: string;
      name: string;
      role: number;
    };
  }
  
  const initialState: AuthState = {
    payload: {
      userId: -1,
      accessToken: '',
      username: '',
      name: '',
      role: -1,
    },
  };
  
  const auth = (state = initialState, action): AuthState => {
    switch (action.type) {
      case 'SIGNIN_SUCCESS':
        return {
          ...state,
          payload: {
            ...state.payload,
            accessToken: action.payload.access_token,
          },
        };
      case 'LOGOUT':
        return {
          ...state,
          payload: {
            ...state.payload,
            accessToken: '',
          },
        };
      case 'STORE_PROFILE':
        return {
          ...state,
          payload: {
            ...state.payload,
            userId: action.payload.userId,
            username: action.payload.username,
            name: action.payload.name,
            role: action.payload.role,
          },
        }
      default:
        return state;
    }
  };
  
  export default auth;
  