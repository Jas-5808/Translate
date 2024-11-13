import cn from "./mainCss.module.css"
import logo from '../assets/logo.webp';
import instagram from '../assets/instagram.png';
import facebook from '../assets/facebook.png';
import telegram from '../assets/telegram.png';


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
                            <li><a href="https://t.me/+K3lWCAL21cE2MzFi">Центр помощи</a></li>
                            <li><a href="#">Заказать сайт</a></li>
                            <li><a href="#">Поддержка проекта</a></li>
                        </ul>
                        <ul className={cn.footer_menu}>
                            <li><span>Другое</span></li>
                            <li><a href="#">Партнеры</a></li>
                            <li><a href="#">Отзывы</a></li>
                            <li><a href="#">Оставить идею для сайта</a></li>
                        </ul>
                        <div className={cn.social_links}>
                            <span>Социальные сети</span>
                            <ul>
                                <li><a href=""><img src={telegram} alt="" /></a></li>
                                <li><a href=""><img src={instagram} alt="" /></a></li>
                                <li><a href=""><img src={facebook} alt="" /></a></li>
                            </ul>
                        </div>
                    </div>

                </div>  
            </footer>
        </>
    )
}
    