import { useState, useEffect, lazy, Suspense } from 'react';
import cn from "./style.module.css";
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = lazy(() => import("../components/LanguageSwitcher"));
const Description = lazy(() => import('../components/Description'));
const Helmet = lazy(() => import('react-helmet').then(module => ({ default: module.Helmet })));

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const { t } = useTranslation();

  const getCurrentLanguage = () => {
    const language = location.pathname.split('/')[1];  
    return language || 'en'; 
  };

  const currentLanguage = getCurrentLanguage();

  const generatePassword = () => {
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += charset[Math.floor(Math.random() * charset.length)];
    }
    setPassword(generatedPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  return (
    <div className="container p-0">
      <div className={cn.title}>
        <div className={cn.title_content}>
          <h3>{t('password_generator')}</h3>
          <Suspense fallback={null}>
            <LanguageSwitcher/>
          </Suspense>
        </div>
        <ul>
          <li><a href="/qrCodeGenerator">
            <i className="material-symbols-outlined" translate="no">qr_code</i>
            <p>{t('qr_code_generator')} <span>URL</span> </p>
          </a></li>
          <li><a href="/shortener">
            <i className="material-symbols-outlined" translate="no">link</i>
            <p>{t('shorten_link')} <span>https, http, ftp</span> </p>
          </a></li>
        </ul>
      </div>
      <div className="card shadow p-4">
        <div className="form-group mb-3">
          <div className="alert alert-success text-center">
          {t('generated_password')} <strong>{password}</strong>
          </div>
          <label htmlFor="passwordLength" className="form-label">
          {t('password_length')} <strong>{length}</strong>
          </label>
          <input
            type="range"
            id="passwordLength"
            className="form-range"
            value={length}
            min="4"
            max="50"
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="includeUppercase"
            className="form-check-input"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          <label htmlFor="includeUppercase" className="form-check-label">
          {t('include_uppercase')}
          </label>
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="includeNumbers"
            className="form-check-input"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          <label htmlFor="includeNumbers" className="form-check-label">
          {t('include_numbers')}
          </label>
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="includeSymbols"
            className="form-check-input"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          <label htmlFor="includeSymbols" className="form-check-label">
          {t('include_symbols')}
          </label>
        </div>

        <button
          className="btn btn-primary d-block mx-auto"
          onClick={generatePassword}
        >
          {t('generate')}
        </button>
      </div>

      <Suspense fallback={null}>
          <Description 
          title="password_generator_online" 
          description="generator_description" 
          />
      </Suspense>

      <Suspense fallback={null}>
        <Helmet>
          <html lang={currentLanguage} />
          <title>{t('password_generator_online')}</title>
          <meta name="description" content={t('generator_description')} />
          <meta name="keywords" content={t('passwordGenerator_page_keywords')} />

          <link rel="alternate" href={`https://sneptool.com/en/passwordGenerator`} hrefLang="en" />
          <link rel="alternate" href={`https://sneptool.com/ru/passwordGenerator`} hrefLang="ru" />
          <link rel="alternate" href={`https://sneptool.com/uz/passwordGenerator`} hrefLang="uz" />
          <link rel="alternate" href={`https://sneptool.com/tr/passwordGenerator`} hrefLang="tr" />
          <link rel="alternate" href={`https://sneptool.com/ky/passwordGenerator`} hrefLang="ky" />
          <link rel="alternate" href={`https://sneptool.com/fr/passwordGenerator`} hrefLang="fr" />
          <link rel="alternate" href={`https://sneptool.com/es/passwordGenerator`} hrefLang="es" />
          <link rel="alternate" href={`https://sneptool.com/de/passwordGenerator`} hrefLang="de" />
          <link rel="alternate" href={`https://sneptool.com/zh/passwordGenerator`} hrefLang="zh" />
          <link rel="alternate" href={`https://sneptool.com/ar/passwordGenerator`} hrefLang="ar" />
          <link rel="alternate" href={`https://sneptool.com/cs/passwordGenerator`} hrefLang="cs" />
        </Helmet>
      </Suspense>
    </div>
  );
};

export default PasswordGenerator;
