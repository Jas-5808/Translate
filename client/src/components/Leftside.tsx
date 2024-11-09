import cn from "./mainCss.module.css"

export function Leftside(){

    return (
        <>
            <div className={cn.leftside}>
                <div className={cn.leftside_content}>
                    <a href="/" className={cn.logo}>Free Translate Hub</a>

                    <ul className={cn.menu}>
                        <li><a href="/">Переводчик</a></li>
                        <li><a href="/colorPicker">Color Picker</a></li>
                        <li><a href="/about">О нас</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
    