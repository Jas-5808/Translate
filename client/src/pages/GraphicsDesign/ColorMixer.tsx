import React, { useState } from 'react';
import cn from "../style.module.css";

export function ColorMixer() {
  const [colors, setColors] = useState(["#ff0000", "#0000ff"]);

  const handleColorChange = (index, newColor) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    setColors(newColors);
  };

  const addColor = () => {
    if (colors.length < 10) {
      setColors([...colors, "#ffffff"]);
    }
  };

  const removeColor = (index) => {
    const newColors = colors.filter((_, idx) => idx !== index);
    setColors(newColors);
  };

  const mixColors = (colors) => {
    const rgbValues = colors.map(hexToRgb);
    const mixedRgb = rgbValues.reduce(
      (acc, rgb) => ({
        r: acc.r + rgb.r,
        g: acc.g + rgb.g,
        b: acc.b + rgb.b
      }),
      { r: 0, g: 0, b: 0 }
    );

    const count = rgbValues.length;
    return rgbToHex(Math.round(mixedRgb.r / count), Math.round(mixedRgb.g / count), Math.round(mixedRgb.b / count));
  };

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgbToHex = (r, g, b) => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  };

  const mixedColor = mixColors(colors);

  return (
    <div>
        <div className={cn.title}>
          <h3>Определить цвет пикселя на картинке</h3>
          <ul>
              <li><a href="/colorPicker">
                  <i className="material-symbols-outlined">palette</i>
                  <p>Определить цвет по фото<span>.jpg, .png, .svg, .gif</span> </p>
              </a></li>
          </ul>
       </div>

      <div className={cn.resoltColor}>
        <h2>Результат смешивания: <span>{mixedColor}</span></h2>
        <div className={cn.resoltColor_card}
          style={{
              backgroundColor: mixedColor,
          }}
        ></div>
      </div>

      <div className={cn.colorMix}>
        {colors.map((color, index) => (
          <div key={index} className={cn.colorMix_input}>
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(index, e.target.value)}
            />
            <div className={cn.colorMix_text}>
              <p>{color}</p>
              <button
                className={cn.removeButton}
                onClick={() => removeColor(index)}
                >
                    <i className="material-symbols-outlined fs-5">delete</i>
                </button>
            </div>
          </div>
        ))}
      </div>

      {colors.length < 10 && (
        <button onClick={addColor} className={cn.uploadButton}>
          Add Color
        </button>
      )}
    </div>
  );
}

export default ColorMixer;
