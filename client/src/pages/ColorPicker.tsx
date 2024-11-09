import React, { useRef, useState } from 'react';
import cn from "./style.module.css";

export function ColorPicker() {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#ffffff');
  const [rgbColor, setRgbColor] = useState('rgb(255, 255, 255)');
  const [img, setImg] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const newImg = new Image();
      newImg.src = URL.createObjectURL(file);

      newImg.onload = () => {
        // Сохраняем изображение для дальнейших вычислений
        setImg(newImg);

        canvas.width = newImg.width;
        canvas.height = newImg.height;
        ctx.drawImage(newImg, 0, 0);
      };
    }
  };

  const handleMouseMove = (e) => {
    if (!img) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Вычисляем координаты на канвасе, учитывая его размеры
    const x = (e.clientX - rect.left) * (img.width / rect.width);
    const y = (e.clientY - rect.top) * (img.height / rect.height);
    
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const hexColor = `#${((1 << 24) + (pixelData[0] << 16) + (pixelData[1] << 8) + pixelData[2]).toString(16).slice(1)}`;
    const rgbColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
    
    setColor(hexColor);
    setRgbColor(rgbColor);
  };

  return (
    <div className={cn.color_picker}>
        <div className={cn.title}>
            <h3>Определить цвет пикселя на картинке</h3>
        </div>

      <input
        type="file"
        accept="image/*"
        id="upload"
        onChange={handleImageUpload}
        className={cn.hidden_input}
      />
      
      <label htmlFor="upload" className={cn.custom_button}>Загрузить изображение</label>
      
      <div className={cn.picker_img}>
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
        />
        <div className={cn.color_info}>
          <p>Результат:</p>
          <div className={cn.color_box} style={{ backgroundColor: color }} />
          <p>HEX: <span className={cn.color_text}>{color}</span></p>
          <p>RGB: <span className={cn.color_text}>{rgbColor}</span></p>
        </div>
      </div>

      <div className={cn.description}>
          <h2>Выбор цвета с изображения</h2>
          <p>На этой странице пользователи могут загрузить изображение и выбрать на нем любой цвет с помощью функции "Color Picker". Простой и удобный инструмент позволяет определить точный цвет в любом месте изображения, а также получить его представление в форматах HEX и RGB. Это идеальное решение для дизайнеров, разработчиков и всех, кто работает с цветами и нуждается в точных цветовых значениях с изображений.</p>
      </div>  
    </div>
  );
}
