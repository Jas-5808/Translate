import cn from "./mainCss.module.css"

const Header = () =>{

    return (
        <>
            <header className={cn.header}>
                <ul className={cn.header_list}>
                    <li>
                        <a href="/"><i className="fa fa-language fs-4"></i></a>
                    </li>
                    <li>
                        <a href="/colorPicker"><i className="material-symbols-outlined fs-8" translate="no">palette</i></a>
                    </li>
                    <li>
                        <a href="/currencyConverter"><i className="material-symbols-outlined fs-8" translate="no">change_circle</i></a>
                    </li>
                    <li>
                        <a href="/qrCodeGenerator"><i className="material-symbols-outlined fs-8" translate="no">qr_code_scanner</i></a>
                    </li>
                    <li>
                        <a href="/about"><i className="fa fa-info-circle fs-4"></i></a>
                    </li>
                </ul>
            </header>
        </>
    )
}

export default Header;
    