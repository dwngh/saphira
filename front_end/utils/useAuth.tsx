import { useDispatch, useSelector } from "react-redux";
import { IAuthState } from "../store/auth/auth";

export function useAuth() {
    const dispatch = useDispatch();
    const accessToken = useSelector(
        ({ auth }: { auth: IAuthState }) => auth.payload.accessToken
    );
    const username = useSelector(
        ({ auth }: { auth: IAuthState }) => auth.payload.username
    );
    const name = useSelector(
        ({ auth }: { auth: IAuthState }) => auth.payload.name
    );
    const role = useSelector(
        ({ auth }: { auth: IAuthState }) => auth.payload.role
    );

    const signin = (res) => {
        dispatch({
            type: "SIGNIN_SUCCESS",
            payload: res,
        });
    };

    const logout = () => {
        dispatch({
            type: "LOGOUT",
        });
    };

    const storeProfile = (profile) => {
        dispatch({
            type: "STORE_PROFILE",
            payload: profile,
        });
    };

    return { accessToken, username, name, role, signin, logout, storeProfile };
}
