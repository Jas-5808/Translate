import cn from "./mainCss.module.css";
import logo from '../assets/logo.webp';
import 'font-awesome/css/font-awesome.min.css';
import { useLocation } from "react-router-dom";
import { Settings } from "../pages/Settings";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

export function Leftside() {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation();


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        console.log("isModalOpen:", !isModalOpen); 
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
                                <i className="fa fa-language"></i> {t('translator')}
                            </a>
                        </li>
                        <li className={`${cn.menuItem} ${location.pathname === '/colorPicker' ? cn.active : ''}`}>
                            <a href="/colorPicker" className={cn.menuLink}>
                                <i className="material-symbols-outlined fs-5" translate="no">palette</i> {t('color_picker')}
                            </a>
                        </li> 
                        <li className={`${cn.menuItem} ${location.pathname === '/currencyConverter' ? cn.active : ''}`}>
                            <a href="/currencyConverter" className={cn.menuLink}>
                                <i className="material-symbols-outlined fs-5" translate="no">change_circle</i> {t('converter')}
                            </a>
                        </li> 
                        <li className={`${cn.menuItem} ${location.pathname === '/qrCodeGenerator' ? cn.active : ''}`}>
                            <a href="/qrCodeGenerator" className={cn.menuLink}>
                                <i className="material-symbols-outlined fs-5" translate="no">qr_code_scanner</i> {t('qr_code')}
                            </a>
                        </li> 
                        <li className={`${cn.menuItem} ${location.pathname === '/about' ? cn.active : ''}`}>
                            <a href="/about" className={cn.menuLink}>
                                <i className="fa fa-info-circle"></i> {t('about_us')}
                            </a>
                        </li>
                    </ul>
                    <a
                        href="#"
                        className={cn.settings}
                        onClick={(e) => { e.preventDefault(); toggleModal(); }}
                    >
                        <i className="material-symbols-outlined fs-5" translate="no">settings</i> {t('settings')}
                    </a>
                </div>
            </div>
            {isModalOpen && <Settings closeModal={toggleModal} />}
        </div>
    );
}
