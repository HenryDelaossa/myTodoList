import { Navigate, Outlet } from "react-router-dom";
import { useContextAuth } from "../../context/contextAuth";
import { TODOLIST } from "../../routes/paths";

export const PublicRoutes = () => {

    const { userLoggedIn } = useContextAuth()
    return (
        <>
            {userLoggedIn ? <Navigate to={TODOLIST} /> : <section> <Outlet /></section>}
        </>
    )
}
