import cn from "./mainCss.module.css";
import logo from '../assets/logo.webp';
import 'font-awesome/css/font-awesome.min.css';
import { useLocation } from "react-router-dom";

export function Leftside() {
    const location = useLocation();

    return (
        <div className={cn.leftside}>
            <div className={cn.leftside_content}>
                <a href="/" className={cn.logo_text}>
                    <img src={logo} className={cn.logo} alt="logo" />
                    SnepTool
                </a>
                <ul className={cn.menu}>
                    <li className={`${cn.menuItem} ${location.pathname === '/' ? cn.active : ''}`}>
                        <a href="/" className={cn.menuLink}>
                            <i className="fa fa-language"></i> Переводчик
                        </a>
                    </li>
                    <li className={`${cn.menuItem} ${location.pathname === '/colorPicker' ? cn.active : ''}`}>
                        <a href="/colorPicker" className={cn.menuLink}>
                            <i className="material-symbols-outlined">palette</i> Графика и дизайн
                        </a>
                    </li> 
                    <li className={`${cn.menuItem} ${location.pathname === '/about' ? cn.active : ''}`}>
                        <a href="/about" className={cn.menuLink}>
                            <i className="fa fa-info-circle"></i> О нас
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
