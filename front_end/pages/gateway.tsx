import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthService } from "../service/AuthService";
import { useAuth } from "../utils/useAuth";

export default function GatewayPage(props) {
    const { username, accessToken, role } = useAuth();
    const router = useRouter();
    const {validateToken} = AuthService();

    const validation = async() => {
        let jwtValid = await validateToken(accessToken);
        if (!jwtValid) router.push({
            pathname: "/login",
            query: { warning: "Session expired!" },
        });
        let roleStr = "";
        switch (role) {
            case 1:
                roleStr = "patient";
                break;
            case 3:
                roleStr = "doctor";
                break;
            case 2:
                roleStr = "secretary";
                break;
            case 0:
                roleStr = "admin";
                break;
        }
        if (roleStr != "") router.push(`/${roleStr}/home`);
    }

    useEffect(() => {
        if (!accessToken || !username) {
            router.push({
                pathname: "/login",
                query: { warning: "Please login!" },
            });
        }
        validation();
    }, []);

    return <div></div>;
}
