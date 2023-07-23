import { useEffect, useState } from "react";
import useAuth from "../../hook/useAuth";
import useRefreshToken from "../../hook/useRefreshToken";
import { Outlet } from "react-router-dom";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth} = useAuth();

  const refresh = useRefreshToken();
  useEffect(() => {
    async function verifyRefreshToken() {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);
  return <>{!isLoading ? <Outlet /> : <p>Loading...</p>}</>;
}

export default PersistLogin;
