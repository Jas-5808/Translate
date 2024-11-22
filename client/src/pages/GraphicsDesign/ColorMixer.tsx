import { useState, lazy, Suspense } from 'react';
import cn from "../style.module.css";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const LanguageSwitcher = lazy(() => import("../../components/LanguageSwitcher"));
const Helmet = lazy(() => import('react-helmet').then(module => ({ default: module.Helmet })));
const Description = lazy(() => import('../../components/Description'));

const ColorMixer = () => {
  const [colors, setColors] = useState(["#ff0000", "#0000ff"]);
  const { t } = useTranslation();
  const location = useLocation();

  const getCurrentLanguage = () => {
    const language = location.pathname.split('/')[1];  
    return language || 'en'; 
  };

  const currentLanguage = getCurrentLanguage();


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
          <div className={cn.title_content}>
              <h3>{t('color_mixer_tool')}</h3>
              <Suspense fallback={null}>
                <LanguageSwitcher/>
              </Suspense>
          </div>
          <ul>
              <li><a href="/colorPicker">
                  <i className="material-symbols-outlined" translate="no">palette</i>
                  <p>{t('define_color_by_photo')}<span>.jpg, .png, .svg, .gif</span> </p>
              </a></li>
          </ul>
       </div>

      <div className={cn.resoltColor}>
        <h2>{t('mixing_result')} <span>{mixedColor}</span></h2>
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
              <input
                type="text"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                maxLength="7"
                placeholder="Enter HEX code"
                className={cn.colorHexInput}
              />
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
          {t('add_color')}
        </button>
      )}

      <div className={cn.mixing_examples}>
        <h3>{t('color_mixing_examples')}</h3>
        <ul>
            <li><span className={cn.red}>{t('red')}</span> + <span className={cn.green}>{t('lime')}</span> + <span className={cn.blue}>{t('blue')}</span> = <span className={cn.gray}>{t('gray')}</span></li>
            <li><span className={cn.red}>{t('red')}</span> + <span className={cn.blue}>{t('blue')}</span> = <span className={cn.purple}>{t('purple')}</span></li>
            <li><span className={cn.red}>{t('red')}</span> + <span className={cn.blue}>{t('blue')}</span> + <span className={cn.blue}>{t('blue')}</span> = <span className={cn.violet}>{t('violet')}</span></li>
            <li><span className={cn.red}>{t('red')}</span> + <span className={cn.yellow}>{t('yellow')}</span> = <span className={cn.orange}>{t('orange')}</span></li>
            <li><span className={cn.red}>{t('red')}</span> + <span className={cn.green2}>{t('green')}</span> = <span className={cn.brown}>{t('brown')}</span></li>
            <li><span className={cn.blue}>{t('blue')}</span> + <span className={cn.green}>{t('lime')}</span> = <span className={cn.turquoise}>{t('turquoise')}</span></li>
        </ul>
      </div>

      <Suspense fallback={null}>
        <Description 
          title="color_mixer" 
          description="color_mixing_description" 
        />
      </Suspense>


      <Suspense fallback={null}>
        <Helmet>
            <html lang={currentLanguage} />
            <title>{t('color_mixer')}</title>
            <meta name="description" content={t('color_mixing_description')} />
            <meta name="keywords" content={t('colorMixing_page_keywords')} />

            <link rel="alternate" href="https://sneptool.com/en/colorMixer" hrefLang="en" />
            <link rel="alternate" href="https://sneptool.com/ru/colorMixer" hrefLang="ru" />
            <link rel="alternate" href="https://sneptool.com/uz/colorMixer" hrefLang="uz" />
            <link rel="alternate" href="https://sneptool.com/tr/colorMixer" hrefLang="tr" />
            <link rel="alternate" href="https://sneptool.com/ky/colorMixer" hrefLang="ky" />
            <link rel="alternate" href="https://sneptool.com/fr/colorMixer" hrefLang="fr" />
            <link rel="alternate" href="https://sneptool.com/es/colorMixer" hrefLang="es" />
            <link rel="alternate" href="https://sneptool.com/de/colorMixer" hrefLang="de" />
            <link rel="alternate" href="https://sneptool.com/zh/colorMixer" hrefLang="zh" />
            <link rel="alternate" href="https://sneptool.com/ar/colorMixer" hrefLang="ar" />
            <link rel="alternate" href="https://sneptool.com/cs/colorMixer" hrefLang="cs" />
        </Helmet>
      </Suspense>

    </div>
  );
}

export default ColorMixer;
