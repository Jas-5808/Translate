import cn from "./mainCss.module.css"
import logo from '../assets/logo.webp';
import instagram from '../assets/instagram.png';
import facebook from '../assets/facebook.png';
import telegram from '../assets/telegram.png';
import youtube from '../assets/youtube.png';
import { useTranslation } from 'react-i18next';

const Footer = () =>{
    const { t } = useTranslation();

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
                            <li><span>{t('service_and_support')}</span></li>
                            <li><a href="https://t.me/+K3lWCAL21cE2MzFi">{t('help_center')}</a></li>
                            <li><a href="/about#order-site">{t('order_website')}</a></li>
                            <li><a href="#">{t('project_support')}</a></li>
                        </ul>
                        <ul className={cn.footer_menu}>
                            <li><span>{t('others')}</span></li>
                            <li><a href="/partners">{t('partners')}</a></li>
                            <li><a href="#">{t('reviews')}</a></li>
                            <li><a href="https://t.me/advertising_hp/4">{t('advertising')}</a></li>
                        </ul>
                        <div className={cn.social_links}>
                            <span>{t('social_media')}</span>
                            <ul>
                                <li><a href=""><img src={telegram} alt="" loading="lazy"/></a></li>
                                <li><a href=""><img src={instagram} alt="" loading="lazy"/></a></li>
                                <li><a href=""><img src={facebook} alt="" loading="lazy"/></a></li>
                                <li><a href="https://www.youtube.com/@sairprogramming"><img src={youtube} alt="" loading="lazy"/></a></li>
                            </ul>
                        </div>
                    </div>

                </div>  
            </footer>
        </>
    )
}

export default Footer;