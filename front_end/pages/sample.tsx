import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../utils/useAuth";

const Sample = () => {
    const { name, accessToken, logout } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!accessToken) router.push("/login");
    }, [accessToken]);
    return (
        <div>
            <h3>
                君の名前は<b>{name}</b>です。<br />
                残念ながらこのページは何もありません。<br />
                ごめんなさい！
            </h3>
            <button onClick={logout}> Log out </button>
        </div>
    );
};

export default Sample;
