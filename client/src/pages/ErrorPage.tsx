import { NavLink } from "react-router-dom";
import cn from "./style.module.css";
import { useTranslation } from 'react-i18next';

export function ErrorPage(){
    const { t } = useTranslation();

    return(
        <>
            <div className={cn.errorPage}>
                <div className={cn.errorPage_content}>
                    <h2>404</h2>

                    <p>{t('something_went_wrong')}</p>
                    <NavLink to="/">{t('go_back')}</NavLink>
                </div>
            </div>
        </>
    )
}