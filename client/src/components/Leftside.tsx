import cn from "./mainCss.module.css"

export function Leftside(){

    return (
        <>
            <div className={cn.leftside}>
                <div className={cn.leftside_content}>
                    <a href="#" className={cn.logo}>Free Translate Hub</a>

                    <ul className={cn.menu}>
                        <li><a href="#">О нас</a></li>
                        <li><a href="#">Соц сеть</a></li>
                        <li><a href="#">Больше</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
    