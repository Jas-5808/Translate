import cn from "./mainCss.module.css"

export function Footer(){

    return (
        <>
            <footer className={cn.footer}>
                <div className={cn.footer_content}>
                    <ul>
                        <li><a href="#">link</a></li>
                        <li><a href="#">link</a></li>
                        <li><a href="#">link</a></li>
                    </ul>
                </div>
            </footer>
        </>
    )
}
    