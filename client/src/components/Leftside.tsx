import cn from "./mainCss.module.css";
import logo from '../assets/logo.webp';
import 'font-awesome/css/font-awesome.min.css';
import { useLocation } from "react-router-dom";
import { Settings } from "../pages/Settings";
import { useState } from "react";

export function Leftside() {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        console.log("isModalOpen:", !isModalOpen); // Отладка состояния
    };
    
    return (
        <div className={cn.leftside}>
            <div className={cn.leftside_content}>
                <a href="/" className={cn.logo_text}>
                    <img src={logo} className={cn.logo} alt="logo" />
                    SnepTool
                </a>
                <div className={cn.menuWrapper}>
                    <ul className={cn.menu}>
                        <li className={`${cn.menuItem} ${location.pathname === '/' ? cn.active : ''}`}>
                            <a href="/" className={cn.menuLink}>
                                <i className="fa fa-language"></i> Переводчик
                            </a>
                        </li>
                        <li className={`${cn.menuItem} ${location.pathname === '/colorPicker' ? cn.active : ''}`}>
                            <a href="/colorPicker" className={cn.menuLink}>
                                <i className="material-symbols-outlined fs-5">palette</i> Выбор цвета
                            </a>
                        </li> 
                        <li className={`${cn.menuItem} ${location.pathname === '/currencyConverter' ? cn.active : ''}`}>
                            <a href="/currencyConverter" className={cn.menuLink}>
                                <i className="material-symbols-outlined fs-5">change_circle</i> Конвертер
                            </a>
                        </li> 
                        <li className={`${cn.menuItem} ${location.pathname === '/shortener' ? cn.active : ''}`}>
                            <a href="/shortener" className={cn.menuLink}>
                                <i className="material-symbols-outlined fs-5">translate</i> Сократить ссылку
                            </a>
                        </li> 
                        <li className={`${cn.menuItem} ${location.pathname === '/about' ? cn.active : ''}`}>
                            <a href="/about" className={cn.menuLink}>
                                <i className="fa fa-info-circle"></i> О нас
                            </a>
                        </li>
                    </ul>
                    <a
                        href="#"
                        className={cn.settings}
                        onClick={(e) => { e.preventDefault(); toggleModal(); }}
                    >
                        <i className="material-symbols-outlined fs-5">settings</i> Настройки
                    </a>
                </div>
            </div>
            {isModalOpen && <Settings closeModal={toggleModal} />}
        </div>
    );
}
