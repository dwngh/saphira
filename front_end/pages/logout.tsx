import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../utils/useAuth";

const Sample = () => {
    const { name, accessToken, logout } = useAuth();
    const router = useRouter();
    useEffect(() => {
        logout();
        router.push("/login");
    }, []);
    return (
        <div>
        </div>
    );
};

export default Sample;
