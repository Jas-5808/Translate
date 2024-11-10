import React, { useRef, useState } from 'react';
import { FaCopy } from 'react-icons/fa';

export function ColorPicker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState<string>('#ffffff');
  const [rgbColor, setRgbColor] = useState<string>('rgb(255, 255, 255)');
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [isColorSelected, setIsColorSelected] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredArea, setHoveredArea] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [isZoomVisible, setIsZoomVisible] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const newImg = new Image();
      newImg.src = URL.createObjectURL(file);

      newImg.onload = () => {
        if (canvas && ctx) {
          setImg(newImg);
          canvas.width = newImg.width;
          canvas.height = newImg.height;
          ctx.drawImage(newImg, 0, 0);
        }
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!img || isColorSelected) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const rect = canvas?.getBoundingClientRect();
    if (rect && ctx) {
      const x = (e.clientX - rect.left) * (img.width / rect.width);
      const y = (e.clientY - rect.top) * (img.height / rect.height);
      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = `#${((1 << 24) + (pixelData[0] << 16) + (pixelData[1] << 8) + pixelData[2]).toString(16).slice(1)}`;
      const rgbColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;

      setColor(hexColor);
      setRgbColor(rgbColor);

      setHoveredArea({ x, y });

      if (!isZoomVisible) {
        setIsZoomVisible(true);
      }
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!img) return;

    if (isColorSelected) {
      setIsColorSelected(false);
    } else {
      setIsColorSelected(true);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const rect = canvas?.getBoundingClientRect();
      if (rect && ctx) {
        const x = (e.clientX - rect.left) * (img.width / rect.width);
        const y = (e.clientY - rect.top) * (img.height / rect.height);
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const hexColor = `#${((1 << 24) + (pixelData[0] << 16) + (pixelData[1] << 8) + pixelData[2]).toString(16).slice(1)}`;
        const rgbColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;

        setColor(hexColor);
        setRgbColor(rgbColor);
      }
    }
  };

  const resetSelection = () => {
    setIsColorSelected(false);
  };

  const copyToClipboard = (colorType: 'hex' | 'rgb') => {
    const text = colorType === 'hex' ? color : rgbColor;
    navigator.clipboard.writeText(text).then(() => {
      alert(`Copied ${text} to clipboard!`);
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newZoom = zoomLevel + e.deltaY * -0.01;
    setZoomLevel(Math.min(Math.max(1, newZoom), 3));
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h3>Определить цвет пикселя на картинке</h3>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="position-relative" onWheel={handleWheel}>
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onClick={handleCanvasClick}
              className="w-100 border rounded shadow"
              style={{ maxHeight: '500px', cursor: 'crosshair' }}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3 border rounded shadow">
            <p>Результат:</p>
            <div className="mb-3" style={{ height: '50px', backgroundColor: color, border: '1px solid #ddd' }} />
            <div className="d-flex justify-content-between align-items-center">
              <p><strong>HEX:</strong> <span>{color}</span></p>
              <button className="btn btn-sm btn-secondary" onClick={() => copyToClipboard('hex')}>
                <FaCopy />
              </button>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p><strong>RGB:</strong> <span>{rgbColor}</span></p>
              <button className="btn btn-sm btn-secondary" onClick={() => copyToClipboard('rgb')}>
                <FaCopy />
              </button>
            </div>
            <div>
              {img && isZoomVisible && (
                <div
                  className="zoomed-area"
                  style={{
                    position: 'static', 
                    marginTop: '20px', 
                    width: '150px',
                    height: '150px',
                    backgroundImage: `url(${img.src})`,
                    backgroundSize: `${img.width * zoomLevel}px ${img.height * zoomLevel}px`,
                    backgroundPosition: `-${hoveredArea.x * zoomLevel - 75}px -${hoveredArea.y * zoomLevel - 75}px`,
                    border: '2px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s ease-in-out',
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                  }}
                >
                  <div
                    style={{
                      fontSize: '36px', 
                      color: 'white', 
                      pointerEvents: 'none', 
                    }}
                  >
                    +
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <div className="text-center mt-4 mb-4">
        <input
          type="file"
          accept="image/*"
          id="upload"
          onChange={handleImageUpload}
          className="d-none"
        />
        <label htmlFor="upload" className="btn btn-primary btn-lg">
          Загрузить изображение
        </label>
      </div>

      <div className="text-center mt-4">
        <h2>Выбор цвета с изображения</h2>
        <p>На этой странице пользователи могут загрузить изображение и выбрать на нем любой цвет с помощью функции "Color Picker". Простой и удобный инструмент позволяет определить точный цвет в любом месте изображения, а также получить его представление в форматах HEX и RGB. Это идеальное решение для дизайнеров, разработчиков и всех, кто работает с цветами и нуждается в точных цветовых значениях с изображений.</p>
      </div>
    </div>
  );
}
