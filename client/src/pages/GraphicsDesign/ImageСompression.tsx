import cn from "../style.module.css";

export function ImageCompression(){
    return(
        <>
            <div className={cn.title}>
            <ul>
                <li><a href="/colorPicker">Выбор цвета</a></li>
                <li><a href="/currencyConverter">Конвертер изображений</a></li>
            </ul>
            <h3>Сжатие изображений</h3>
            </div>
        </>
    )
}