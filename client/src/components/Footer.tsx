import cn from "./mainCss.module.css"
import logo from '../assets/logo.webp';

export function Footer(){

    return (
        <>
            <footer className={cn.footer}>
                <div className={cn.footer_content}>
                    <a href="/" className={cn.logo_text}>
                        <img src={logo} className={cn.logo} alt="logo" />
                        SnepTool
                    </a>
                    <div className={cn.footer_list}>
                        <ul className={cn.footer_menu}>
                            <li><span>Сервис и Поддержка</span></li>
                            <li><a href="#">Центр помощи</a></li>
                            <li><a href="#">Заказать сайт</a></li>
                            <li><a href="#">Поддержка проекта</a></li>
                        </ul>
                        <ul className={cn.footer_menu}>
                            <li><span>Другое</span></li>
                            <li><a href="#">Центр помощи</a></li>
                            <li><a href="#">Закажите свой сайт</a></li>
                            <li><a href="#">Поддержка проекта</a></li>
                        </ul>
                        <div className={cn.social_links}>
                            <span>Социальные сети</span>
                            <ul>
                                <li><a href="">lorem</a></li>
                                <li><a href="">lorem</a></li>
                                <li><a href="">lorem</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </footer>
        </>
    )
}
    