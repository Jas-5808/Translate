import cn from "./style.module.css";
import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../components/LanguageSwitcher";
import { Helmet } from 'react-helmet';


export function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const qrRef = useRef();
  const { t } = useTranslation();


  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qrcode.png";
      link.click();
    }
  };

  return (
    <div className="container p-0">
      <div className={cn.title}>
          <div className={cn.title_content}>
                    <h3>{t('qr_code_generator')}</h3>
                    <LanguageSwitcher/>
                </div>
          <ul>
              <li><a href="/shortener">
                  <i className="material-symbols-outlined" translate="no">link</i>
                  <p>{t('shorten_link')} <span>.pdf, .docx, .txt</span> </p>
              </a></li>
          </ul>
      </div>
      <div className="card shadow p-4">
        <div className="mb-3">
          <label htmlFor="urlInput" className="form-label">
          {t('enter_url')}
          </label>
          <input
            id="urlInput"
            type="text"
            className="form-control"
            placeholder="https://example.com"
            value={url}
            onChange={handleInputChange}
          />
        </div>
        {url && (
          <div className="text-center my-4" ref={qrRef}>
            <QRCodeCanvas value={url} size={200} />
            <p className="mt-2">{t('scan_to_visit')} {url}</p>
          </div>
        )}
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary"
            onClick={handleDownload}
            disabled={!url}
          >
            {t('download_qr_code')}
          </button>
        </div>
      </div>

                  
      <div className={cn.description}>
          <h2>{t('qr_code_creation')}</h2>
          <p>{t('qr_code_creation_description')}</p>
      </div>
      <Helmet>
          <title>{t('qr_code_creation')}</title>
          <meta name="description" content={t('qr_code_creation_description')} />
          <meta name="keywords" content={t('qrCode_page_keywords')} />
      </Helmet>
    </div>
  );
}
