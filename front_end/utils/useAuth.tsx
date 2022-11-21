import { useDispatch, useSelector } from "react-redux";
import { IAuthState } from "../store/auth/auth";


export function useAuth() {
    const dispatch = useDispatch();
    const accessToken = useSelector(
        ({ auth }: { auth: IAuthState }) => auth.payload.accessToken,
    );

    const signin = (res) => {
        dispatch({
            type: 'SIGNIN_SUCCESS',
            payload: res,
          });
    }

    const logout = () => {
        dispatch({
            type: 'LOGOUT',
          });
    }

    return {accessToken, signin, logout}
}