import React, { useState } from "react";
import cn from "./style.module.css"; 

export function Settings({ closeModal }: { closeModal: () => void }) {
    const [isDarkMode, setIsDarkMode] = useState(false); 

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className={cn.modal} onClick={handleBackdropClick}>
            <div className={cn.modal_content}>
                <button className={cn.close_button} onClick={closeModal}>X</button>
                <h2>Настройки</h2>

                <div className={cn.setting_option}>
                    <label htmlFor="language">Выберите язык:</label>
                    <select id="language">
                        <option value="ru">Русский</option>
                        <option value="en">English</option>
                    </select>
                </div>

                <div className={cn.setting_option}>
                    <label>Темная тема:</label>
                    <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                    />
                </div>

                <div className={isDarkMode ? cn.dark_mode : ''}>
                    <p>Предпросмотр темной темы</p>
                </div>
            </div>
        </div>
    );
}
