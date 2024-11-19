import React, { useRef, useState, useEffect } from 'react';
import { FaCopy } from 'react-icons/fa';
import cn from "../style.module.css";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { Helmet } from 'react-helmet';


export function ColorPicker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState<string>('#ffffff');
  const [rgbColor, setRgbColor] = useState<string>('rgb(255, 255, 255)');
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [isColorSelected, setIsColorSelected] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredArea, setHoveredArea] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [isZoomVisible, setIsZoomVisible] = useState<boolean>(false);
  const { t } = useTranslation();


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

  // Handle paste event to insert image from clipboard
  const handlePaste = (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    // Look for image in clipboard
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') === 0) {
        const file = item.getAsFile();
        if (file) {
          const newImg = new Image();
          const reader = new FileReader();
          reader.onloadend = () => {
            newImg.src = reader.result as string;
            newImg.onload = () => {
              const canvas = canvasRef.current;
              const ctx = canvas?.getContext('2d');
              if (canvas && ctx) {
                setImg(newImg);
                canvas.width = newImg.width;
                canvas.height = newImg.height;
                ctx.drawImage(newImg, 0, 0);
              }
            };
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  // Add paste event listener
  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!img || isColorSelected) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const rect = canvas?.getBoundingClientRect();
    if (rect && ctx) {
      const x = (e.clientX - rect.left) * (img.width / rect.width);
      const y = (e.clientY - rect.top) * (img.height / rect.height);
      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = `#${((1 << 24) + (pixelData[0] << 16) + (pixelData[1] << 8) + (pixelData[2])).toString(16).slice(1)}`;
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
        const hexColor = `#${((1 << 24) + (pixelData[0] << 16) + (pixelData[1] << 8) + (pixelData[2])).toString(16).slice(1)}`;
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
    <div className="container p-0">

      <div className={cn.title}>
          <div className={cn.title_content}>
                    <h3>{t('define_pixel_color')}</h3>
                    <LanguageSwitcher/>
                </div>
          <ul>
              <li><a href="/colorMixer">
                  <i className="material-symbols-outlined" translate="no">colors</i>
                  <p>{t('color_blending')} <span>{t('up_to_10_colors')}</span> </p>
              </a></li>
          </ul>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="position-relative" onWheel={handleWheel}>
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onClick={handleCanvasClick}
              className="w-100 border rounded shadow bg-white"
              style={{ maxHeight: '500px', cursor: 'crosshair' }}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3 border rounded shadow bg-white">
            <p>{t('color_picker_result')}</p>
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

      <div className="mt-5">
        <input
          type="file"
          accept="image/*"
          id="upload"
          onChange={handleImageUpload}
          className="d-none"
        />
        <label htmlFor="upload" className={cn.uploadButton}>
          {t('upload_image')}
        </label>
      </div>

      <div className={cn.description}>
        <h2>{t('select_color_from_image')}</h2>
        <p>{t('color_picker_description')}</p>
      </div>
      <Helmet>
          <title>{t('select_color_from_image')}</title>
          <meta name="description" content={t('color_picker_description')} />
          <meta name="keywords" content={t('colorPicker_page_keywords')} />
      </Helmet>
    </div>
  );
}
