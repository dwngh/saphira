import { useDispatch, useSelector } from "react-redux";
import { AuthState } from "../redux/auth/auth";

export function useAuth() {
    const dispatch = useDispatch();
    const accessToken = useSelector(
        ({ auth }: { auth: AuthState }) => auth.payload.accessToken
    );
    const username = useSelector(
        ({ auth }: { auth: AuthState }) => auth.payload.username
    );
    const name = useSelector(
        ({ auth }: { auth: AuthState }) => auth.payload.name
    );
    const role = useSelector(
        ({ auth }: { auth: AuthState }) => auth.payload.role
    );
    const userId = useSelector(
        ({ auth }: { auth: AuthState }) => auth.payload.userId
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

    return { accessToken, username, name, role, userId, signin, logout, storeProfile };
}
