export interface IAuthState {
  payload: {
    accessToken: string;
    username: string;
    name: string;
    role: number;
  };
}

const initialState: IAuthState = {
  payload: {
    accessToken: '',
    username: '',
    name: '',
    role: -1,
  },
};

const auth = (state = initialState, action): IAuthState => {
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
