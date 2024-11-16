import cn from "./style.module.css";
import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const qrRef = useRef();

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
          <h3>Генератор QR-кода</h3>
          <ul>
              <li><a href="/shortener">
                  <i className="material-symbols-outlined">link</i>
                  <p>Сократить ссылку <span>.pdf, .docx, .txt</span> </p>
              </a></li>
          </ul>
      </div>
      <div className="card shadow p-4">
        <div className="mb-3">
          <label htmlFor="urlInput" className="form-label">
            Enter your URL:
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
            <p className="mt-2">Scan to visit: {url}</p>
          </div>
        )}
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary"
            onClick={handleDownload}
            disabled={!url}
          >
            Download QR Code
          </button>
        </div>
      </div>

                  
      <div className={cn.description}>
          <h2>Создание QR-кодов</h2>
          <p>На этой странице вы можете быстро и легко создать QR-код, введя любой текст или ссылку. Генератор поддерживает моментальное обновление кода и позволяет скачать его в формате изображения. Это идеально подходит для создания QR-кодов для ваших визиток, сайтов, акций или личных нужд.</p>
      </div>
    </div>
  );
}
