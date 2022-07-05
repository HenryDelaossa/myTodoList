import "./login.css"
import { useEffect, useContext } from "react";
import { ContextAuth } from "../../context/contextAuth";


export const Logis = () => {

    const {
        handleLoginOldUser,
        checkForm,
        register,
        ifIsRegist,
        handleRegisterNew,
        handlChangInfClient,
        verifyAuthAndRedirect
    } = useContext(ContextAuth)

    useEffect(() => {
        verifyAuthAndRedirect()
    }, [verifyAuthAndRedirect])


    return (
        <section className="section-login-register">
            <h2>{!register ? "INGRESAR A MI CUENTA" : "REGISTRARME"}</h2>
            <form >
                {!register ?
                    <>
                        <div className="groupInpt">
                            <input placeholder="email registrado" type="email" name="userEmail" id="userEmail" value={checkForm.dates.userEmail || ''} onChange={handlChangInfClient} />
                            <label htmlFor="userEmail">email</label>
                        </div>
                        <div className="groupInpt">
                            <input placeholder="password" type="password" name="userPassword" id="userPassword" value={checkForm.dates.userPassword || ''} onChange={handlChangInfClient} />
                            <label htmlFor="userPassword">password</label>
                        </div>
                        <div className="ctn-buttons">
                            <button onClick={handleLoginOldUser} className="custom-btn btn">Ingresar</button>
                            <button onClick={() => ifIsRegist(true)} className="custom-btn btn">Registrarme</button>
                        </div>

                    </>
                    :
                    <>
                        <div className="groupInpt">
                            <input placeholder="nombre completo" type="text" name="userName" id="nombre" value={checkForm.dates.userName || ''} onChange={handlChangInfClient} />
                            <label htmlFor="nombre">nombre completo</label>
                        </div>
                        <div className="groupInpt">
                            <input placeholder="email" type="email" name="userEmail" id="correo" value={checkForm.dates.userEmail || ''} onChange={handlChangInfClient} />
                            <label htmlFor="correo">email</label>
                        </div>
                        <div className="groupInpt">
                            <input placeholder="repetir email" type="text" name="userEmailConfirm" id="correoConfirm" value={checkForm.dates.userEmailConfirm || ''} onChange={handlChangInfClient} />
                            <label htmlFor="correoConfirm">confirma tu email</label>
                        </div>
                        <div className="groupInpt">
                            <input placeholder="password" type="password" name="userPassword" id="contrasenna" value={checkForm.dates.userPassword || ''} onChange={handlChangInfClient} />
                            <label htmlFor="contrasenna">password</label>
                        </div>
                        <div className="groupInpt">
                            <input placeholder="repetir password" type="password" name="userPasswordConfirm" id="contrasennaConfirm" value={checkForm.dates.userPasswordConfirm || ''} onChange={handlChangInfClient} />
                            <label htmlFor="contrasennaConfirm">confirmar password</label>
                        </div>
                        <div className="gropuTerminos">
                            <label className="labelTerminos" htmlFor="checkTerminos">acepto terminos</label>
                            <input type="checkbox" name="checkTerminos" id="checkTerminos" />

                        </div>
                        <div className="ctn-buttons" >
                            <button onClick={handleRegisterNew} className="custom-btn btn" >Registrarme </button>
                            <button onClick={() => ifIsRegist(false)} className="custom-btn btn">Iniciar sesion</button>
                        </div>
                    </>
                }
            </form>
        </section>
    )
}