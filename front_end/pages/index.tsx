import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../utils/useAuth";

export default function GatewayPage(props) {
    const { username, accessToken, role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!accessToken || !username) {
            router.push({
                pathname: "/login",
                query: { warning: "Please login!" },
            });
        }
        let roleStr = "";
        switch (role) {
            case 1:
                roleStr = "patient";
                break;
            case 2:
                roleStr = "doctor";
                break;
            case 3:
                roleStr = "secretary";
                break;
            case 0:
                roleStr = "admin";
                break;
        }
        if (roleStr != "") router.push(`/${roleStr}/home`);
    }, []);

    return <div></div>;
}
