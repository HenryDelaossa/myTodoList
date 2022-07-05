import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../firebase/firebase";

export const ContextAuth = createContext()

export const AuthProvider = ({ children }) => {


    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [checkForm, setCheckForm] = useState({ dates: {} });
    const [register, setRegister] = useState(false);

    /**
     * It takes an event object, and then it sets the state of the checkForm object to the current
     * state of the checkForm object, but with the value of the event object's target's name property
     * set to the event object's target's value property.
     */
    const handlChangInfClient = (e) => {
        setCheckForm({
            dates: {
                ...checkForm.dates,
                [e.target.name]: e.target.value,
            }
        });
    }

    /**
     * When the user clicks the submit button, prevent the default action, then sign in with the email
     * and password provided by the user, then alert the user that they have successfully logged in,
     * otherwise alert the user that there was an error.
     */
    const handleLoginOldUser = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, checkForm.dates.userEmail, checkForm.dates.userPassword)
            .then(() => { alert(`Bienvenido a tu cuenta, ${auth.currentUser.email}`) })
            .catch((err) => alert(err.message));
    }

    /**
     * IfIsRegist is a function that takes a boolean as an argument and sets the value of the register
     * state to the value of the boolean argument and sets the value of the checkForm state to an empty
     * object.
     */
    const ifIsRegist = (bool) => {
        setRegister(bool);
        setCheckForm({ dates: {} });
    }

    /**
     * If the user's email and password are the same, then create a new user with the email and
     * password.
     */
    const handleRegisterNew = (e) => {
        e.preventDefault();
        if (checkForm.dates.userEmail !== checkForm.dates.userEmailConfirm) {
            alert('tu email no coincide');
        } else if (checkForm.dates.userPassword !== checkForm.dates.userPasswordConfirm) {
            alert('no coincide tu contraseña');
        } else {
            createUserWithEmailAndPassword(auth, checkForm.dates.userEmail, checkForm.dates.userPassword)
                .then(() => {
                    alert("usuario creado correctamente")
                })
                .catch(err => alert(err.message));
        }
    }

    /**
     * If the user is logged in, set the userLoggedIn state to true, otherwise set it to false.
     */
    const verifyAuthAndRedirect = () => {
        auth.onAuthStateChanged((user) => {
            user ? setUserLoggedIn(true) : setUserLoggedIn(false);
        });
    }

    const toContext = {
        // verify userLogged
        userLoggedIn,
        verifyAuthAndRedirect,

        handleLoginOldUser,
        setCheckForm,
        checkForm,

        handlChangInfClient,

        ifIsRegist,
        register,

        handleRegisterNew

    };


    return <ContextAuth.Provider value={toContext}>{children} </ContextAuth.Provider>
}



// hook
export const useContextAuth = () => {
    return useContext(ContextAuth);

}