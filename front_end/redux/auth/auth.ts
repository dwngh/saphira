export interface AuthState {
    payload: {
      accessToken: string;
      username: string;
      name: string;
      role: number;
    };
  }
  
  const initialState: AuthState = {
    payload: {
      accessToken: '',
      username: '',
      name: '',
      role: -1,
    },
  };
  
  const auth = (state = initialState, action): AuthState => {
    switch (action.type) {
      case 'SIGNIN_SUCCESS':
        console.log("Fucking success");
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
        console.log("Fucking store");
        return {
          ...state,
          payload: {
            ...state.payload,
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
  