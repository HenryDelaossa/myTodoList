import "./home.css"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContextAuth } from "../../context/contextAuth";





export const Home = () => {

  const { verifyAuthAndRedirect } = useContextAuth()

  useEffect(() => {

    verifyAuthAndRedirect()
  }, [verifyAuthAndRedirect/*navigate*/])


  return (
    <section className="sectionHome">
      <h1 className="titleHome">Bienvenido a TODOLIST, tu app para:
        <div className="ctn-rotateWords">
          <span>Tareas</span>
          <span>Mas Tareas</span>
          <span>Progarar tus Oficios</span>
          <span>Y mas...</span>
        </div>
      </h1>
      <button className="button-ir-mis-tareas"><span><Link to={'/mytodolist'}>mis tareas</Link></span></button>

    </section>
  )
}
