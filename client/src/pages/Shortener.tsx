import { useState, lazy, Suspense } from "react";
import cn from "./style.module.css";
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = lazy(() => import("../components/LanguageSwitcher"));
const Description = lazy(() => import('../components/Description'));
const Helmet = lazy(() => import('react-helmet').then(module => ({ default: module.Helmet })));

const Shortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const getCurrentLanguage = () => {
    const language = location.pathname.split('/')[1];  
    return language || 'en'; 
  };

  const currentLanguage = getCurrentLanguage();

  const shortenUrl = async () => {
    setError("");
    setShortUrl("");
    try {
      const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bcf311054d42b33248946d5a6aef67d1acc368c4", 
        },
        body: JSON.stringify({ long_url: longUrl }),
      });

      const data = await response.json();
      if (response.ok) {
        setShortUrl(data.link);
      } else {
        setError(data.message || "Ошибка при сокращении ссылки.");
      }
    } catch (err) {
      setError("Ошибка сети или сервера.");
    }
  };

  return (
    <div className="container p-0">
      <div className={cn.title}>
        <div className={cn.title_content}>
          <h3>{t('shorten_link_online')}</h3>
          <Suspense fallback={null}>
            <LanguageSwitcher/>
          </Suspense>
        </div>
        <ul>
          <li><a href="/qrCodeGenerator">
            <i className="material-symbols-outlined" translate="no">qr_code</i>
            <p>{t('qr_code_generator')} <span>URL</span> </p>
          </a></li>
          <li><a href="/passwordGenerator">
            <i className="material-symbols-outlined" translate="no">lock</i>
            <p>{t('password_generator')} <span>{t('50_characters')}</span> </p>
          </a></li>
        </ul>
      </div>

      <div className="card shadow p-4">
        <label htmlFor="longUrl" className="form-label">
        {t('enter_link')}
        </label>
        <input
          type="url"
          id="longUrl"
          className="form-control mb-3"
          placeholder="https://example.com"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />

        <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={shortenUrl}>
            {t('shorten')}
            </button>
        </div>
        {error && (
            <div className="alert alert-danger mt-3 text-center" role="alert">
            {error}
            </div>
        )}
        {shortUrl && (
            <div className="alert alert-success mt-3 text-center" role="alert">
            {t('shortened_link')}{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
            </a>
            </div>
        )}
      </div>

      <Suspense fallback={null}>
          <Description 
          title="quick_link_shortening" 
          description="description" 
          />
      </Suspense>

      <Suspense fallback={null}>
        <Helmet>
          <html lang={currentLanguage} />
          <title>{t('quick_link_shortening')}</title>
          <meta name="description" content={t('description')} />
          <meta name="keywords" content={t('shortener_page_keywords')} />

          <link rel="alternate" href={`https://sneptool.com/en/shortener`} hrefLang="en" />
          <link rel="alternate" href={`https://sneptool.com/ru/shortener`} hrefLang="ru" />
          <link rel="alternate" href={`https://sneptool.com/uz/shortener`} hrefLang="uz" />
          <link rel="alternate" href={`https://sneptool.com/tr/shortener`} hrefLang="tr" />
          <link rel="alternate" href={`https://sneptool.com/ky/shortener`} hrefLang="ky" />
          <link rel="alternate" href={`https://sneptool.com/fr/shortener`} hrefLang="fr" />
          <link rel="alternate" href={`https://sneptool.com/es/shortener`} hrefLang="es" />
          <link rel="alternate" href={`https://sneptool.com/de/shortener`} hrefLang="de" />
          <link rel="alternate" href={`https://sneptool.com/zh/shortener`} hrefLang="zh" />
          <link rel="alternate" href={`https://sneptool.com/ar/shortener`} hrefLang="ar" />
          <link rel="alternate" href={`https://sneptool.com/cs/shortener`} hrefLang="cs" />
        </Helmet>
      </Suspense>

    </div>
  );
};

export default Shortener;
