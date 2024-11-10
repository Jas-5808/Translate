import cn from "./mainCss.module.css"
import logo from '../assets/logo.webp'
import 'font-awesome/css/font-awesome.min.css'

export function Leftside(){

    return (
        <>
            <div className={cn.leftside}>
                <div className={cn.leftside_content}>
                    {/* Логотип и название */}
                    <a href="/" className={cn.logo_text}>
                        <img src={logo} className={cn.logo} alt="logo" />
                        Free Translate Hub
                    </a>

                    {/* Боковое меню */}
                    <ul className={cn.menu}>
                        <li className={cn.menuItem}>
                            <a href="/" className={cn.menuLink}>
                                <i className="fa fa-language"></i> Переводчик
                            </a>
                        </li>
                        <li className={cn.menuItem}>
                            <a href="/colorPicker" className={cn.menuLink}>
                            <i className="material-symbols-outlined">palette</i>
                                Color Picker
                            </a>
                        </li>
                        <li className={cn.menuItem}>
                            <a href="/about" className={cn.menuLink}>
                                <i className="fa fa-info-circle"></i> О нас
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
    