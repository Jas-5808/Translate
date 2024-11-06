import { NavLink } from "react-router-dom";
// import cn from "./style.module.css";

export function About(){
    return(
        <>
            <div className="errorPage">
                <div className="container">
                    <h2>404</h2>

                    <p>Страница в разработке</p>
                    <NavLink to="">Main</NavLink>
                </div>
            </div>
        </>
    )
}