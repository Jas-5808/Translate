import { NavLink } from "react-router-dom";
import cn from "./style.module.css";

export function ErrorPage(){
    return(
        <>
            <div className={cn.errorPage}>
                <div className={cn.errorPage_content}>
                    <h2>404</h2>

                    <p>Что-то пошло не так</p>
                    <NavLink to="/">Main</NavLink>
                </div>
            </div>
        </>
    )
}