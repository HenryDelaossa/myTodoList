import { Navigate, Outlet } from "react-router-dom";
import { useContextAuth } from "../../context/contextAuth";
import { LOGIN } from "../../routes/paths";

export const PrivateRoutes = () => {

    const { userLoggedIn } = useContextAuth()
    return (
        <>
            {!userLoggedIn ? <Navigate to={LOGIN} /> : <div> <Outlet /></div>}
        </>
    )
}