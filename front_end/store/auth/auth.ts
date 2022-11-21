export interface IAuthState {
  payload: {
    accessToken: string;
  };
}

const initialState: IAuthState = {
  payload: {
    accessToken: '',
  },
};

const auth = (state = initialState, action): IAuthState => {
  switch (action.type) {
    case 'SIGNIN_SUCCESS':
      console.log(action);
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
    default:
      return state;
  }
};

export default auth;
