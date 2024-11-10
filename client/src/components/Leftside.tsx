import cn from "./mainCss.module.css"
import logo from '../assets/logo.webp'

export function Leftside(){

    return (
        <>
            {/* <div className={cn.leftside}>
                <div className={cn.leftside_content}>
                    
                    <a href="/" className={cn.logo_text}><img src={logo} className={cn.logo} alt="logo" />Free Translate Hub</a>
                    

                    <ul className={cn.menu}>
                        <li><a href="/">Переводчик</a></li>
                        <li><a href="/colorPicker">Color Picker</a></li>
                        <li><a href="/about">О нас</a></li>
                    </ul>
                </div>
            </div> */}
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
                            <a href="/" className={cn.menuLink}>Переводчик</a>
                        </li>
                        <li className={cn.menuItem}>
                            <a href="/colorPicker" className={cn.menuLink}>Color Picker</a>
                        </li>
                        <li className={cn.menuItem}>
                            <a href="/about" className={cn.menuLink}>О нас</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
    