import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../utils/useAuth'

const Sample = () => {
  const {accessToken, logout} = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!accessToken) router.push("/home");
  }, [accessToken])
  return (
    <div>
        <h3>Your access token <b>{accessToken}</b></h3>
        <button onClick={logout}> Log out </button>
    </div>
  )
}

export default Sample;
